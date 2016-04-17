var request = require('request');
var fs = require('fs');
var express = require('express');
var router = express.Router();

router.post('/save', function (req, res) {
    var video = req.body.video;
    var fileRootName = video.name.split('.').shift();
    var fileExtension = video.name.split('.').pop();

    var fileBuffer = new Buffer(video.contents, "base64");
    fs.writeFileSync('vids/' + video.name, fileBuffer);

    res.send("OK");

});

module.exports = router;