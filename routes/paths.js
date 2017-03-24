var index = require('./index');
var house = require('./house');
var wizzard = require('./wizzard');

module.exports = {
    "/": index,
    "/house/": house,
    "/wizzard/": wizzard
};
