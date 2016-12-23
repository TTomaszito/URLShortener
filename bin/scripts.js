module.exports = {

   validate_URL: function (req){

    var validate = require('url-validator')
    var input = req.url.slice(1)

     if(!isNaN(input)){
       return input
     }
     else{
       var url = validate(input)

       if (url) {
         return url

       } else {
         return false
       }
     }
   }
};
