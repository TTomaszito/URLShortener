var express = require('express')
var mongodb = require('mongodb');

var app = express()
var scripts = require('./bin/scripts');

var MongoClient = mongodb.MongoClient;
var url = 'mongodb://ttom:qwertyu@ds139428.mlab.com:39428/url_database';
//SET MONGOLAB_URI='mongodb://ttom:qwertyu@ds139428.mlab.com:39428/url_database'

app.use(express.static(__dirname +"/public"));

MongoClient.connect(url, function (err, db) {
  if (err) {
    console.log('Unable to connect to the mongoDB server. Error:', err);
  } else {
    console.log('Connection established to', url);

    var collection = db.collection('urls')


    // Get a new url
    app.get('/new/:url*', function (req,res) {


      var input = scripts.validate_URL(req)
      console.log("thissssssss",input);

      if (input) {
          console.log(input)

        collection.findOne({'url':input},function(err,result){
          if (result) {
            console.log(" in database",result);
            res.json({"long_url":input, "short_url":"tbd", in_database:true})

          } else {
            console.log('not in database',result, "added new entry");

            collection.insert({'url':input})

            res.json({"long_url":input, "short_url":"tbd", in_database:false, "comment":"added to database"})

          }
        })

      } else {
        console.log('Wrong url format.');
        res.json({"error":"Wrong url format."})
      }


    })

    // check for existing url
    app.get('/:url*', function (req,res) {

      var input = scripts.validate_URL2(req)
      console.log(input);

      if (input) {
        console.log('valid website check if its in database 2');

      } else {
        res.json({"error":"Wrong url format."})
        console.log('wrong url format 2');
      }


    })


  }
});


app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})
