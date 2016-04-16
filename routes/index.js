var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/testdb', function(req,res, next) {
  var sqlite = require('sqlite3').verbose();
  var db = new sqlite.Database(':qdb');
  console.log(db);
  db.close();

});

module.exports = router;
