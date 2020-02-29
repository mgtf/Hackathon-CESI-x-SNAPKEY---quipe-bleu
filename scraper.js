var express = require('express');
var fs      = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var app     = express();

app.get('/scrape', function(req, res){

    url = 'https://www.geolocaux.com/location/bureau/paris-75/paris-1-75001/';

  fs.writeFileSync('output.json', "[]", (err) => {
          if (err) throw err;
          console.log('crochet1');
        });
  request(url, function(error, response, html){
    if(!error){


      var $ = cheerio.load(html);
      var title, price, surface;
      var data = {prix : "", surface : "", typeTransaction : "", typeBien : ""};
     
     
        fs.appendFileSync('output.json', "[", (err) => {
          if (err) throw err;
          console.log('crochet1');
        });

      $('li.annonce').each(function(i, element){
        var a = $(this).prev();
        var title = $(this).find('.title').text();
        var tprix = $(this).find('.price').text();
        var prix = tprix.replace(/\D/g, "");
        var tsurface = $(this).find('.surface').text()
        var surface = tsurface.replace(/\D/g, "");
        var typeTransaction = $(this).find('.pri').text();
        prix = Math.floor((prix/surface)*12);
        if (title.includes("Bureau")){
          data.typeBien="Bureau";
        }
        else if (title.includes("Local commercial")){
          data.typeBien="Local commercial";
        }
        else if (title.includes("Entrepôt")){
          data.typeBien="Entrepôt";
        }
        else if (title.includes("Fonds de commerce")){
          data.typeBien="Fonds de commerce";
        }
        var cp = title.match(/[0-9]+/); 
        
        console.log(cp)

        data.prix = prix;
        data.surface = surface;
        data.typeTransaction = typeTransaction;

        fs.appendFileSync('output.json', JSON.stringify(data) + (i == ($('li.annonce').length - 1) ? "" : ","), (err) => {
            if (err) throw err;
            console.log('Data written to file');
        });

     });

     
    fs.appendFileSync('output.json', "]", (err) => {
        if (err) throw err;
        console.log('crochet2');
    });
    }
;
    res.send('Check your console!')
  })
})
app.listen('8079')
console.log('Magic happens on port 79');
exports = module.exports = app;

const csvjson = require('csvjson');
const readFile = require('fs').readFile;
const writeFile = require('fs').writeFile;
readFile('./output.json', 'utf-8', (err, fileContent) => {
    if (err) {
        console.log(err); // Do something to handle the error or just throw it
        throw new Error(err);
    }
    const csvData = csvjson.toCSV(fileContent, {
        headers: 'key',
        delimiter   : ";",
        wrap        : false,
        arrayDenote : ""
    });
    console.log(csvData);
    writeFile('./test-data.csv', csvData, (err) => {
        if(err) {
            console.log(err); // Do something to handle the error or just throw it
            throw new Error(err);
        }
        console.log('Success!');
    });
});