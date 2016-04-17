// Client ID, Client Secret Key, and Authorized Redirect URL
var Linkedin = require('node-linkedin')('78hsurrx9er9uc', '2iiUpN10zXMzN2Z8', 'http://localhost:3000/linkedin/licallback');
var express = require('express');
var router = express.Router();
var sqlite = require('sqlite3').verbose();
var db = new sqlite.Database('db/qdb.db');
// var QDB = require('../libs/qdb');

router.get('/oauth', function(req, res) {
  // This will ask for permisssions etc and redirect to callback url.
  Linkedin.auth.authorize(res, ["r_basicprofile", "r_emailaddress"]);
});

router.get('/licallback', function(req, res) {
  // console.error("derp derp");
  Linkedin.auth.getAccessToken(res, req.query.code, req.query.state, function(err, results) {
    if (err)
      return console.error(err);

    /**
     * Results have something like:
     * {"expires_in":5184000,"access_token":". . . ."}
     */
    console.log(results);
    var linkedin = Linkedin.init(results.access_token);
    /*linkedin.people.me(function(err, $me) {
      console.log($me);
      var cols = [
        'firstName',
        'lastName',
        'linkedin_id',
        'email',
        'is_recruiter',
        'pic_url'
      ];

      var vals = [
        $me.currentShare.author.firstName,
        $me.currentShare.author.lastName,
        $me.currentShare.author.id,
        $me.emailAddress,
        false,
        $me.pictureUrls.values[0]
      ];
      db.exec("INSERT INTO users (" + cols.join(",") + ") VALUES (" + "'" + vals.join("','") + "'" + ")", function(err, result) {
          console.log('result: ', result);
          console.log("DONE");
      });
    });
    */
    return res.redirect('/dashboard');
  });
});

//app.get('/oauth/linkedin', function(req, res) {
// This will ask for permisssions etc and redirect to callback url.
//    Linkedin.auth.authorize(res, scope);
//});
router.get('/testdb', function(req, res, next) {
  var sqlite = require('sqlite3').verbose();
  var db = new sqlite.Database(':qdb');
  console.log(db);
  db.close();

});

module.exports = router;

// To load LinkedIn profile by id
// var linkedin_id =
// linkedin.people.id('linkedin_id', function(err, $in) {
//     // Loads the profile by id.
// });
