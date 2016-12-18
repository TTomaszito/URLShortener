var express = require('express')
var app = express()
var scripts = require('./bin/scripts');

app.use(express.static(__dirname +"/public"));


app.get('/*', function (req,res) {

  var inputURL = req.params[0]
  var output = scripts.validate_URL(req)


  res.send(output)
})







app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})
