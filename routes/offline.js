var express = require('express');
var router = express.Router();

/****
** Get
****/
router.get('/', function(req, res) {
    res.render('offline');
});

module.exports = router;
