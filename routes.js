var index = require('./routes/index');
var house = require('./routes/house');
var wizzard = require('./routes/wizzard');

module.exports = {
    "/": index,
    "/house/": house,
    "/wizzard/": wizzard
};
