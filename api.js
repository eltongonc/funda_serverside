// envs setup
require('dotenv').config();

var express = require('express');
var api = express();

api.get('/', function(req, res) {
    var query = req.path;
    console.log(query);
    res.send("api");
});


var server = api.listen(5000, function() {
  console.log('API running on port ' + server.address().port);
});
