var express = require('express');
var router = express.Router();

var key = process.env.KEY;
var request = require("request");

/* GET users listing. */
router.get('/', function(req, res) {
  res.send('respond with a resource');
});

router.get('/:id', function(req, res) {
    console.log(req.params);
    var url = `http://partnerapi.funda.nl/feeds/Aanbod.svc/json/detail/${key}/koop/${req.params.id}/`;
    console.log(url);

    request(url, function (error, response, data) {
        console.log(data);
        // res.render('detail', { title: "Funda", data:JSON.parse(data) });
    });

});

module.exports = router;
