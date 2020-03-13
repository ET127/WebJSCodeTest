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
app.use(express.static('public'));

//Homepage
app.get('/', function (req, res) {

    res.sendFile(path.join(__dirname, './views', 'index.html'));

});

//API request for an article
app.get('/api/article', async function (req, res) {

    console.log(`Requesting article ${req.query.index}`);

    var index = req.query.index;
    var url = `https://cdn.glitch.com/006951d0-00e5-46ee-8e12-50194cef8cd0%2Farticle-${index}.json`;
    var data = await fetch(url).then(response => response.json());

        const article = await (fetch(url)
        .then(response => response.json())
        .catch(err => {
        console.error(err);

        return err;
        }));

    return res.json(article);

    //
});

//API request for posting a ranking
app.post('/api/rank',function(req,res){
    var ranking = req.body.ranking;
  
    console.log(ranking);
    res.send("Recieved");
  });

//Respond to invalid requests
  app.use(function(req, res, next) {
    return res.status(404).sendFile(path.join(__dirname, './views', 'error.html'));
  });

//Listen for requests
var listener = app.listen((process.env.PORT || 3000), function () {
    console.log(`Your app is listening on port ${listener.address().port}`);
});
