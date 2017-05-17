var express = require('express');
var router = express.Router();

var key = process.env.KEY;
var request = require("request");

/* GET users listing. */
router.get('/', function(req, res) {
  res.send('respond with a resource');
});

router.get('/:id', function(req, res) {
    var url = `http://partnerapi.funda.nl/feeds/Aanbod.svc/json/detail/${key}/koop/${req.params.id}/`;

    request(url, function (error, response, data) {
        res.render('detail', { title: "Funda", data:JSON.parse(data) });
    });

});

router.get(/(koop||huur)/, function(req, res) {
    var query = req.path;
    // Very ugly!I know. Turning "/koop/heel-nederland/p2/" to "koop", "heel-nederland" and "2"
    var pagenumber = query.match(/\/p[0-9]*\//) ? query.match(/\/p[0-9]*\//)[0].split("/p")[1].split("/")[0] : 1;
    var type = query.split("/")[1];
    var zo = query.replace(/\/p[0-9]*\//, "").replace(/^\/[a-zA-Z]*\//,"");

    var url = `http://partnerapi.funda.nl/feeds/Aanbod.svc/json/${key}/?type=${type}&zo=/${zo}/&page=${pagenumber}&pagesize=25`;

    request(url, function (error, response, data) {
        res.render('index', { title: "Funda", data:JSON.parse(data), replace: function(arg) {return arg.replace("/~","");} });
    });
    // res.send({zo,type, pagenumber});
});

module.exports = router;
