var index = require('./index');
var house = require('./house');
var wizzard = require('./wizzard');
var offline = require('./offline');

module.exports = {
    "/": index,
    "/house/": house,
    "/offline": offline
    // "/wizzard/": wizzard
};
