var express = require('express');
var router = express.Router();

var key = process.env.KEY;
var request = require("request");

/****
** Get
****/
router.get('/', function(req, res) {
    res.render('wizzard', { title: "Funda" });
});
/****
** Posts
****/
router.post('/', function(req, res) {
    var url = generateURL(req.body);
    console.log(req.body);

    request(url, function (error, response, data) {
        console.log(JSON.parse(data));
      res.render('index', { title: "Funda", data:JSON.parse(data) });
    });
});


/****
** Helpers
****/
function generateURL(options){
    var url = {
        base: "http://partnerapi.funda.nl/feeds/Aanbod.svc/json/",
        key: key +"/",
        type: options.type || "koop",
        query: "&zo=/" + options.search.toLowerCase() + "/" || "&zo=/heel-nederland/",
        kamers: createRange(options.kamers, "kamer") + "/",
        options: arrayToString(options.opties)
    };
    return `${url.base}${url.key}?type=${url.type}${url.query}${url.kamers}${url.options}&page=1&pagesize=25`
}

function arrayToString(array){
    var string;
    if (typeof array !== "string" ) {
        string= array.reduce(function(total, current){
            return total + current + "/";
        },"");
    }else {
        string = array + "/";
    }

    return string || "";
}

function createRange(array, name){
    // ensure the the array is sorted
    if (typeof array !== "string" ) { array.sort(); }
    if (array.length == 1) {
        // return a number with an - or + separator
        return `${array[0]}${array[0] == 1? "-":"+"}${array[0] == 1? name: name+"s"}`;
    }else {
        // returns firstDigit-LastDigit-name
        return `${array[0]}-${array[array.length - 1 ]}-${name}s`;
    }
}


module.exports = router;
