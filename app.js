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
    app.get('/:url*', function (req,res) {


      var input = scripts.validate_URL(req)
      console.log("thissssssss",input);

      if(!isNaN(input) && input!=false){
        console.log('check db bc it a number',input);
        var digit = parseInt(input)
        collection.findOne({"short_url":digit},function(err,result){
          console.log(" SHORT URL in database",result);
          res.json({"long_url":result.long_url, "short_url":result.short_url})
        })
      }



      if (isNaN(input) && input!=false) {
          console.log(input)

        collection.findOne({'long_url':input},function(err,result){
          if (result) {
            console.log(" in database",result);

            res.json({"long_url":result.long_url, "short_url":result.short_url, in_database:true})

          } else {
            console.log('not in database',result, "added new entry");
            var shorturl = (Math.floor(Math.random() * 1000))
            collection.insert({'long_url':input,'short_url':shorturl})

            res.json({"long_url":input, "short_url":shorturl, in_database:false, "comment":"added to database"})

          }
        })

      }
      if(input == false) {
        console.log('Wrong url format1.');
        res.json({"error":"Wrong url format1."})
      }


    })




  }
});


app.listen(process.env.PORT, function () {
  console.log('Example app listening on port 3000!')
})
