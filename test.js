var express = require('express');
var fs      = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var app     = express();

app.get('/scrape', function(req, res){

  url = 'https://www.geolocaux.com/location/bureau/paris-75/paris-1-75001/';

  request(url, function(error, response, html){
    if(!error){
      var $ = cheerio.load(html);

      var title, price, surface;
      var data = { title : "", prix : "", surface : "", type : ""};
         
    
    $('li.annonce').each(function(i, element){
        var a = $(this).prev();
        //console.log(a.text());
        var title = $(this).find('.title').text();
        var prix = $(this).find('.price').text();
        var surface = $(this).find('.surface').text();
        
        data.title = title;
        data.prix = prix;
        data.surface = surface;
      /*  fs.readFile('output.json', 'utf8', function (err, data) {
            if (err) throw err; 
            var obj = JSON.stringify(data);
            console.log(obj);
        });*/
        
     });
    }
;
        

    res.send('Check your console!')
  })
})

app.listen('8079')
console.log('Magic happens on port 79');
exports = module.exports = app;
