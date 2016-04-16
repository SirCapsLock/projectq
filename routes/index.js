var Linkedin = require('node-linkedin')('app-id', 'secret', 'callback');
var express = require('express');
var router = express.Router();

// /* GET home page. */
 router.get('/', function(req, res, next) {
   res.render('index', { title: 'Project Q' });
 });

// module.exports = router;

//var linkedin = Linkedin.init('my_access_token');

// If we want to specify a timeout for the HTTP request
// var linkedin = Linkedin.init('my_access_token', {
//     timeout: 60000
// });

// Using a library like `expressjs` the module will
// redirect for you simply by passing `res`.
//app.get('/oauth/linkedin', function(req, res) {
// This will ask for permisssions etc and redirect to callback url.
// <<<<<<< Updated upstream
//    Linkedin.auth.authorize(res, scope);
//});

router.get('/testdb', function(req,res, next) {
  var sqlite = require('sqlite3').verbose();
  var db = new sqlite.Database(':qdb');
  console.log(db);
  db.close();

});

module.exports = router;
