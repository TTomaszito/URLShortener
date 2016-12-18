module.exports = {


   validate_URL: function (req){

     var validate = require('url-validator')

     var input = req.params[0]
     var url = validate(input)

     if (url) {
       return url

     } else {
       return false
     }
   }


};
