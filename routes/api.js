var request = require('request');
var fs = require('fs');
var express = require('express');
var router = express.Router();
var req = request.defaults();

router.get('/interviews', function(req, res) {
    
});


var sqlite = require('sqlite3').verbose();
var db = new sqlite.Database('db/qdb.db');


router.get('/interview', function (req, res) {
   
    //use req.query when doing ?id=0
    //and req.params when doing /:id
    var interviewID = req.query.id;
    
    //this will get all the rows at once for the specific int id. 
   var questions = db.get("SELECT * FROM questions WHERE interview_id = " + interviewID, function(err, rows) {
       console.log(rows);
   });
    
    //this is a for each loop to iterate through all the rows returned for an interview id
    //then you can call the column names
    //db.each("SELECT * FROM questions WHERE interview_id = 0", function(err, rows) {
    //   console.log(row.text); 
    //});
   
});

//returns the current sponsors, specifically for the dashboard
router.get('/sponsors', function(req, res){
    
    var response = {};
    var collection = [];
    
    var count = 0;
    var total = 0;
    
    db.all("SELECT * FROM interviews WHERE sponsoring = 'TRUE'", function(err, interviews) {
        
        //console.log('Interviews Err: ', err);
        //console.log('Interviews: ', interviews);
        
        //console.log(interviews.length);
        total = interviews.length;
        
        interviews.forEach(function(interview) {
            //console.log('Interview:', interview);
            
            var sponsor = {};
            
            sponsor.interviewID = interview.id; 
            sponsor.interview = interview.title;
            
            db.get("SELECT * FROM users WHERE id = " + interview.user_id, function(err, user) {
                //console.log('From User Error: ', err);
                //console.log('From User Result:', user);
                
                sponsor.recruiter = user.firstname + " " + user.lastname;
                
                db.get("SELECT * FROM recruiters WHERE user_id = " + user.id, function(err, recr) {
                    //console.log('From rcur Error: ', err);
                    //console.log('From rcur Result:', recr);
                    
                    db.get("SELECT * FROM companies WHERE id = " + recr.company_id, function(err, comp) {
                        //console.log('From comp Error: ', err);
                        //console.log('From comp Result:', comp);
                        
                        sponsor.company = comp.name;
                        
                        //console.log("current sponsor:  ", sponsor);
                        
                        collection.push(sponsor);
                        console.log("\n\n collection: ", collection);
                        
                        response.sponsors = collection;
                        
                        count++;
                        
                        if (count === total) {
                            console.log(response);
                            res.json(response);
                        }
                    });
                });
            });
        });
    });
    
});


//returns a random question of the day
router.get('/qday', function(req, res){
    var sponsors = db.get("SELECT * FROM questions WHERE sponsoring = TRUE", function(err, rows){
        console.log(err);
        
    });
});


router.post('/interview', function(req,res){
    
});

module.exports = router;
