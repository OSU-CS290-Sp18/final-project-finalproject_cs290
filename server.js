var path = require('path');
var express = require('express');
var exphbs = require('express-handlebars');
var bodyParser = require('body-parser');
var MongoClient = require('mongodb').MongoClient;

var mongoHost = process.env.MONGO_HOST;
var mongoPort = process.env.MONGO_PORT || '27017';
var mongoUsername = process.env.MONGO_USERNAME;
var mongoPassword = process.env.MONGO_PASSWORD;
var mongoDBName = process.env.MONGO_DB_NAME;

var mongoURL = "mongodb://" + mongoUsername + ":" + mongoPassword + "@" + mongoHost + ":" + mongoPort + "/" + mongoDBName;

console.log("==MongoDB URL:", mongoURL); 

var mongoDB = null;

var app = express();
var port = process.env.PORT || 3000;

app.engine('handlebars', exphbs({defaultLayout: "main"}));
app.set('view engine', 'handlebars');

app.use(bodyParser.json());

app.use(express.static('public'));

app.get('/', function (req, res, next){
   res.status(200).render('lizardPage');
 });

app.get('/lizards', function (req, res, next){
  var profileCollection = mongoDB.collection('lizards');
  profileCollection.find().toArray(function (err, lizards) {
    if (err) {
      res.status(500).send("Error fetching profiles from DB.");
    } else {
      res.status(200).render('lizardPage', {
        profile: lizards
      });
    }
  });
});

app.post('/lizards/addProfile', function (req, res, next) {
  if (req.body && req.body.name && req.body.photoURL && req.body.description) {
    console.log(req.body.name);
    console.log(req.body.photoURL);
    console.log(req.body.description);
    var profile = {
      name: req.body.name,
      photoURL: req.body.photoURL,
      description: req.body.description,
      hearts: 0
    };
    var lizardsCollection = mongoDB.collection('lizards');
    lizardsCollection.insertOne(profile),
      function (err, result) {
        if (err) {
          res.status(500).send("Error inserting photo into DB.")
        } else {
          console.log("== mongo insert result:", result);
          if (result.matchedCount > 0) {
            res.status(200).end();
          } else {
            next();
          }
        }
      };
  }
  else {
    res.status(400).send("Request needs a JSON body with caption and photoURL.")
  }
});
//below this is not finished
app.post('/lizards/:lizard/removeProfile', function (req, res, next) {
  var lizard = req.params.lizard.toLowerCase();
  /*
  if (req.body && req.body.name && req.body.photoURL && req.body.description) {
    var profile = {
      name: req.body.name,
      photoURL: req.body.photoURL,
      description: req.body.description
    };
    */
    var lizardCollection = mongoDB.collection('lizard');
    var myquery = { name: lizard}
    lizardCollection.deleteOne(myquery, function (err, result) {
      if (err) {
        res.status(500).send("Error inserting photo into DB.")
      } 
      else {
        console.log("== mongo insert result:", result);
        if (result.matchedCount > 0) {
          res.status(200).end();
        } else {
          next();
        }
      }
    });
});
//above this is not finished
//still need hearts functionality and delete functionality

app.use('*', function(req, res){
  res.status(404).render('404');
});

MongoClient.connect(mongoURL, function (err, client) {
  if (err) {
    throw err;
  }
  mongoDB = client.db(mongoDBName);
  app.listen(port, function () {
    console.log("== Server listening on port", port);
  });
})
