var express = require('express');
var fs      = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var app     = express();

app.get('/scrape', function(req, res){
  // Let's scrape Anchorman 2
  url = 'https://www.geolocaux.com/location/bureau/paris-75/paris-1-75001/';

  request(url, function(error, response, html){
    if(!error){
      var $ = cheerio.load(html);

      var title, release, rating;
      var json = { title : "", release : "", rating : ""};

     
    $('.price').filter(function(){
        var data = $(this);
        prix = data.text().trim();

        json.title = prix;
    })
      $('li.annonce').each(function(i, element){
      var a = $(this).prev();
      console.log(a.text());
    });  
    }
;
        
    fs.writeFile('output.json', JSON.stringify(json, null, 4), function(err){
      console.log('File successfully written! - Check your project directory for the output.json file');
    })

    res.send('Check your console!')
  })
})

app.listen('8079')
console.log('Magic happens on port 79');
exports = module.exports = app;