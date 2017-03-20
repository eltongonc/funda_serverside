var express = require('express');
var key = process.env.KEY;
var router = express.Router();
var request = require("request");


/* GET home page. */
router.get('/', function(req, res) {
    var url = `http://partnerapi.funda.nl/feeds/Aanbod.svc/json/${key}/?type=koop&zo=/amsterdam/tuin/&page=1&pagesize=25`;
    request(url, function (error, response, data) {
      res.render('index', { title: "Funda", data:JSON.parse(data) });
    });
});
router.get('/:id', function(req, res) {
    var url = `http://partnerapi.funda.nl/feeds/Aanbod.svc/json/detail/${key}/koop/${req.params.id}/`;
    request(url, function (error, response, data) {
      res.render('detail', { title: "Funda", data:JSON.parse(data) });
    });
});

router.post('/', function(req, res) {
    var { search, type } = req.body,
        url = `http://zb.funda.info/frontend/geo/suggest/?query=${search}&max=7&type=${type}`;
    request(url, function (error, response, data) {
        console.log(JSON.parse(data));
      res.render('index', { title: "Funda", data:JSON.parse(data) });
    });
});

module.exports = router;
