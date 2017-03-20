var express = require('express');
var key = process.env.KEY;
var router = express.Router();
var http = require('http');

var url = `http://funda.kyrandia.nl/feeds/Aanbod.svc/json/${key}/`;

var options = {
    host: url,
    port: 80,
    path: '/resource?id=foo&bar=baz',
    method: 'GET'
};

/* GET home page. */
router.get('/', function(req, res) {
    http.request(options, function(res) {
        console.log('STATUS: ' + res.statusCode);
        console.log('HEADERS: ' + JSON.stringify(res.headers));
        res.setEncoding('utf8');
        res.on('data', function (chunk) {
            console.log('BODY: ' + chunk);
        });
    }).end();
    res.render('index', { title: "Funda" });
});

module.exports = router;
