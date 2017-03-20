var index = require('./routes/index');
var house = require('./routes/house');

module.exports = {
    "/": index,
    "/house": house
};
