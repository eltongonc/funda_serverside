var express = require('express');
var router = express.Router();

var key = process.env.KEY;
var request = require("request");


/* GET home page. */
router.get('/', function(req, res) {
    var url = `http://partnerapi.funda.nl/feeds/Aanbod.svc/json/${key}/?type=koop&zo=/heel-nederland/&page=1&pagesize=25`;

    request(url, function (error, response, data) {
      res.render('index', { title: "Funda", data:JSON.parse(data) });
    });
});


/****
** Posts
****/
router.post('/', function(req, res) {
    var url = generateURL(req.body);
    // res.send(url)
    request(url, function (error, response, data) {
      res.render('index', { title: "Funda", data:JSON.parse(data) });
    });
});
// "koop/amsterdam/+1km/50000-75000/"

function generateURL(options){
    var url = {
        base: "http://partnerapi.funda.nl/feeds/Aanbod.svc/json/",
        key: key +"/",
        type: options.type || "koop",
        query: options.query !== "" ? "&zo=/" + options.query.toLowerCase() + "/" : "&zo=/heel-nederland/",
        radius: options.radius !== '0' ? "+"+options.radius + "km/" : "",
        kamers: options.kamers ? createRange(options.kamers, "kamer") + "/" : "",
        options: options.opties ? arrayToString(options.opties) : "",
        prijs_range: options.prijs_van + "-" + options.prijs_tot
    };
    return `${url.base}${url.key}?type=${url.type}${url.query}${url.radius}${url.prijs_range}${url.kamers}${url.options}&page=1&pagesize=25`
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
