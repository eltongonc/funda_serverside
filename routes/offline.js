var express = require('express');
var router = express.Router();

var key = process.env.KEY;
var request = require("request");

/****
** Get
****/
router.get('/', function(req, res) {
    res.render('offline');
});

module.exports = router;
