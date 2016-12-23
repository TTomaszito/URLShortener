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


    

    app.get('/:url*', function (req,res) {


      var input = scripts.validate_URL(req)


      if(!isNaN(input) && input!=false){

        var digit = parseInt(input)
        collection.findOne({"short_url":digit},function(err,result){
          console.log(" short url found in database")
          res.json({"long_url":result.long_url, "short_url":result.short_url})
        })
      }

      if (isNaN(input) && input!=false) {


        collection.findOne({'long_url':input},function(err,result){
          if (result) {
            console.log("Found in database");

            res.json({"long_url":result.long_url, "short_url":result.short_url, in_database:true})

          } else {
            console.log("added new entry");
            var shorturl = (Math.floor(Math.random() * 1000))
            collection.insert({'long_url':input,'short_url':shorturl})

            res.json({"long_url":input, "short_url":shorturl, in_database:false, "comment":"added to database"})

          }
        })

      }
      if(input == false) {

        res.json({"error":"Wrong url format."})
      }
    })
  }
});


app.listen(process.env.PORT, function () {
  console.log('Example app listening on port 3000!')
})
