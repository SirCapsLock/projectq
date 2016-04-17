var Linkedin = require('node-linkedin')('app-id', 'secret', 'callback');
var express = require('express');
var router = express.Router();
var qdb = require('../libs/qdb');
var fs = require('fs');
// /* GET home page. */
 router.get('/', function(req, res, next) {
   res.render('index', { title: 'Project QME' });
 });

router.get('/signup', function(req, res, next) {
   res.render('signup', { title: 'Sign Up | QME' });
 });

router.get('/login', function(req, res, next) {
   res.render('login', { title: 'Login | QME' });
 });

router.get('/recorder', function (req, res) {
    res.render('recorder');
});

router.get('/dashboard', function(req, res, next) {
    
    var sqlite = require('sqlite3').verbose();
var db = new sqlite.Database('db/qdb.db');
    
    var response = {};
    var collection = [];
    
    var count = 0;
    var total = 0;
    
    db.all("SELECT * FROM interviews WHERE sponsoring = 'TRUE'", function(err, interviews) {
        total = interviews.length;
        
        interviews.forEach(function(interview) {
            
            var sponsor = {};
            
            sponsor.interviewID = interview.id; 
            sponsor.interview = interview.title;
            
            db.get("SELECT * FROM users WHERE id = " + interview.user_id, function(err, user) {
                
                sponsor.recruiter = user.firstname + " " + user.lastname;
                
                db.get("SELECT * FROM recruiters WHERE user_id = " + user.id, function(err, recr) {
                    
                    db.get("SELECT * FROM companies WHERE id = " + recr.company_id, function(err, comp) {
                        
                        sponsor.company = comp.name;
                        sponsor.logo = comp.logo;
                        
                        collection.push(sponsor);
                        
                        response.sponsors = collection;
                        
                        count++;
                        
                        if (count === total) {

                            res.render('dashboard', { title: 'Login | QME', data: response.sponsors });
                        }
                    });
                });
            });
        });
    });
    
    
   
 });

router.get('/qdb', function (req, res) {
    qdb.add('users', {
        firstname : 'enrique',
        x: 0
    });
    res.send('hello');
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
  var db = new sqlite.Database('db/qdb.db');
  console.log(db);
  db.close();

});

module.exports = router;
