var request = require('request');
var fs = require('fs');
var express = require('express');
var router = express.Router();
var sqlite = require('sqlite3');
var db = new sqlite.Database('db/qdb.db');

router.post('/save', function (req, res) {
    var video = req.body.video;
    var fileRootName = video.name.split('.').shift();
    var fileExtension = video.name.split('.').pop();

    var question = req.body.question;
    var qid = question.id;

    video.contents = video.contents.split(',').pop();

    var fileBuffer = new Buffer(video.contents, "base64");
    fs.writeFileSync('public/vids/' + video.name, fileBuffer);



    var recURL = 'http://localhost:3000/vids/' + video.name;

    db.serialize(function () {
        var query = "INSERT INTO performances (question_id, user_id, recording_url, avg_rating) VALUES (";
        query += qid + ", " + 4 + ",'" + recURL + "'," + 4 + ")";
        console.log("Query: " + query);
        db.run(query, function (err, result) {
            if(err)
                console.error(err);

            res.send("OK");
        });
    });

    //save video url to database



});

module.exports = router;