// init project
var express = require('express');
const fetch = require("node-fetch");
var async = require('express-async-await');
var bodyParser = require("body-parser");
var fs = require('fs');
var request = require('request');
var app = express();
var path = require('path');

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get('/', function (req, res) {

    console.log(path.join(__dirname, './views', 'index.html'));
    res.sendFile(path.join(__dirname, './views', 'index.html'));

});

app.get('/api/article', async function (req, res) {

    console.log(`Requesting article ${req.query.index}`);

    var index = req.query.index;
    var url = `https://cdn.glitch.com/a7f316a6-8898-4031-a62e-0fbd285b3696%2Farticle-${index}.json`;
    var data = await fetch(url).then(response => response.json());

        const article = await (fetch(`https://cdn.glitch.com/a7f316a6-8898-4031-a62e-0fbd285b3696%2Farticle-${index}.json`)
        .then(response => response.json())
        .catch(err => {
        console.error(err);

        return err;
        }));

    return res.json(article);

    //
});

app.post('/api/rank',function(req,res){
    var ranking = req.body.ranking;
  
    console.log(ranking);
    res.send("Recieved");
  });

// listen for requests :)
var listener = app.listen((process.env.PORT || 3000), function () {
    console.log(`Your app is listening on port ${listener.address().port}`);
});
