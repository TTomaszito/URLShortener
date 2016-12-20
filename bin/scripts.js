module.exports = {


   validate_URL: function (req){

     var validate = require('url-validator')

     var input = req.url.slice(5)
     var url = validate(input)

     if (url) {
       return url

     } else {
       return false
     }
   },

   validate_URL2: function (req){

     var validate = require('url-validator')

     var input = req.url.slice(1)
     console.log(input);
     var url = validate(input)

     if (url) {
       return url

     } else {
       return false
     }
   }


};
