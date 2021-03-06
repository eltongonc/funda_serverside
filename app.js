// envs setup
require('dotenv').config();

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var template  = require('express-handlebars');
var compression = require('compression');
var async = require('async');

var routes = require("./routes/paths.js");

var app = express();


// view engine setup
app.engine('handlebars', template({
  defaultLayout: 'main',
  partialsDir: ['views/partials/']
}));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'handlebars');

// Faster middlewares src:https://engineering.gosquared.com/making-dashboard-faster
function parallel(middlewares) {
  return function (req, res, next) {
    async.each(middlewares, function (mw, cb) {
      mw(req, res, cb);
    }, next);
  };
}

app.use(compression({
    threshhold: 0,
    filter: function (){
        return true;
    }
}))

app.use(parallel([
    logger('dev'),
    bodyParser.json(),
    bodyParser.urlencoded({
        extended: true
    }),
    cookieParser(),
    express.static(path.join(__dirname, 'public'), {  lastModified: false, maxAge: '1y' }),
    favicon(__dirname + '/public/img/favicon.ico')
]));


// Create all routes
for (var x in routes) {
    app.use(x, routes[x]);
}


/// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});


// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: "This page does not exist",
        error: {},
        title: 'error'
    });
});

var server = app.listen(3000, function() {
  console.log('Express server listening on port ' + server.address().port);
});
