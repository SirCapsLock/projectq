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
    
    var response = {};
    
    db.get("SELECT * FROM questions WHERE day_question = 'TRUE'", function(err, questionOfDay) {
        
        //console.log('question', questionOfDay);
        //console.log(questionOfDay.text);
        
        response.question = questionOfDay.text;
        console.log(response);
        res.json(response);
    });
    
    
});

//returns performance feedback
router.get('/performance', function(req, res){
    
    //userid
    //hard coded for now. this will be brought in by the session.
    var userID = 4;
    
    var response = {};
    var collection = [];
    
    var count = 0;
    var total = 0;
    
    db.all("SELECT * FROM performances WHERE user_id = " + userID, function(err, performances) {
        
        //console.log('performances Err: ', err);
        //console.log('performances: ', performances);
        
        //console.log(performances.length);
        total = performances.length;
        
        performances.forEach(function(performance) {
            //console.log('performance:', performance);
            
            var outcome = {};
            outcome.avgRating = performance.avg_rating;
            
            db.get("SELECT * FROM questions WHERE id = " + performance.question_id, function(err, question) {
                //console.log('From question Error: ', err);
                //console.log('From question Result:', question);
                
                outcome.question = question.text;
                outcome.type = question.type;
                
                db.get("SELECT * FROM interviews WHERE id = " + question.interview_id, function(err, interview) {
                    //console.log('From interview Error: ', err);
                    //console.log('From interview Result:', interview);
                    
                    outcome.interview = interview.title;
                    
                    db.all("SELECT * FROM comments WHERE performance_id = " + performance.id, function(err, comments) {
                        //console.log('From comments Error: ', err);
                        //console.log('From comments Result:', comments);

                        outcome.comments = [];
                        
                        outcome.com = {};
                        
                        //count++;
                        
                        comments.forEach(function(comment) {
                            
                            outcome.com.comm = comment.text;
                            
                            db.get("SELECT * FROM users WHERE id = " + comment.user_id, function(err, ruser) {
                                //console.log('From ruser Error: ', err);
                                //console.log('From ruser Result:', ruser);

                                outcome.com.recruiter = ruser.firstname + " " + ruser.lastname;
                                
                                db.get("SELECT * FROM recruiters WHERE user_id = " + ruser.id, function(err, recr) {
                                    //console.log('From rcur Error: ', err);
                                    //console.log('From rcur Result:', recr);
                                
                                    db.get("SELECT * FROM companies WHERE id = " + recr.company_id, function(err, comp) {
                                        //console.log('From comp Error: ', err);
                                        //console.log('From comp Result:', comp);

                                        outcome.com.company = comp.name;

                                        outcome.comments.push(outcome.com);

                                        collection.push(outcome);
                                        
                                        console.log("\n\n COLLECTION: \n\n", collection);

                                        response.performance = collection;
                                        
                                        console.log("\n\n RESPONSE: \n\n", response);

                                        count++;

                                        if (count === total-1) {
                                            console.log(response);
                                            res.json(response);
                                        }
                                    });
                                });
                            });
                            
                        });
                        
                    });
                    
                });
            });
            
        });
        
    });
    
});


    


router.post('/interview', function(req,res){
    
});

module.exports = router;
