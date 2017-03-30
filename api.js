// envs setup
require('dotenv').config();

var express = require('express');
var api = express();

// api.locals.url =

api.get('/', function(req, res) {

    var query = req.path;
    console.log(query);
    res.send(query);
    // // Very ugly!I know. Turning "/koop/heel-nederland/p2/" to "koop", "heel-nederland" and "2"
    // var pagenumber = query.match(/\/p[0-9]*\//) ? query.match(/\/p[0-9]*\//)[0].split("/p")[1].split("/")[0] : 1;
    // var type = query.split("/")[1];
    // var zo = query.replace(/\/p[0-9]*\//, "").replace(/^\/[a-zA-Z]*\//,"");
    //
    //
    // var url = `http://partnerapi.funda.nl/feeds/Aanbod.svc/json/${key}/?type=${type}&zo=/${zo}/&page=${pagenumber}&pagesize=25`;
    //
    // // console.log(url);
    // // res.send(url);
    // request(url, function (error, response, data) {
    //     // console.log(data);
    //   res.render('index', { title: "Funda", data:JSON.parse(data), replace: function(arg) {return arg.replace("/~","");} });
    // });
});


/// catch 404 and forward to error handler
api.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers
api.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.send(err.message)
});

var server = api.listen(5000, function() {
  console.log('Express server listening on port ' + server.address().port);
});
