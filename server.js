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

app.get('*', function(req, res){
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
