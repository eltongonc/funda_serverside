var express = require('express');
var router = express.Router();

var key = process.env.KEY;
var request = require("request");


/**
** GETs
**/
router.get('/', function(req, res) {
    var url = `http://partnerapi.funda.nl/feeds/Aanbod.svc/json/${key}/?type=koop&zo=/heel-nederland/&page=1&pagesize=25`;
    console.log(res.locals);

    request(url, function (error, response, data) {
      res.render('index', { title: "Funda", data:JSON.parse(data), replace: arg => arg.replace("/~","") });
    });
});


/****
** Api
****/
router.get(/api/, function(req, res) {

    var query = req.path;
    // Very ugly!I know. Turning "/api/koop/heel-nederland/p2/" to "koop", "heel-nederland" and "2"
    var pagenumber = query.match(/\/p[0-9]*\//) ? query.match(/\/p[0-9]*\//)[0].split("/p")[1].split("/")[0] : 1;
    var type = query.split("/")[2];
    var zo = query.replace("/api","").replace(/(huur||koop)/, "").replace(/\/p[0-9]*\//, "").replace(/^\/[a-zA-Z]*\//,"");

    console.log(req.path);
    var url = req.path !== "/api/"?
    `http://partnerapi.funda.nl/feeds/Aanbod.svc/json/${key}/?type=${type}&zo=/${zo}/&page=${pagenumber}&pagesize=25`
    :
    `http://partnerapi.funda.nl/feeds/Aanbod.svc/json/${key}/?type=koop&zo=/heel-nederland/&page=1&pagesize=25`;

    request(url, function (error, response, data) {
        // console.log(url);
        res.send(data);
    });
});

router.get(/(koop||huur)/, function(req, res) {
    var query = req.path;
    // Very ugly!I know. Turning "/koop/heel-nederland/p2/" to "koop", "heel-nederland" and "2"
    var pagenumber = query.match(/\/p[0-9]*\//) ? query.match(/\/p[0-9]*\//)[0].split("/p")[1].split("/")[0] : 1;
    var type = query.split("/")[1];
    var zo = query.replace(/\/p[0-9]*\//, "").replace(/^\/[a-zA-Z]*\//,"");


    var url = `http://partnerapi.funda.nl/feeds/Aanbod.svc/json/${key}/?type=${type}&zo=/${zo}/&page=${pagenumber}&pagesize=25`;

    // console.log(url);
    // res.send(url);
    request(url, function (error, response, data) {
        // console.log(data);
      res.render('index', { title: "Funda", data:JSON.parse(data), replace: function(arg) {return arg.replace("/~","");} });
    });
    // res.send({zo,type, pagenumber});
});




/****
** POSTs
****/
router.post('/', function(req, res) {
    var url = generateURL(req.body);
    res.locals.url = url;

    // res.send(url)
    request(url, function (error, response, data) {
      res.render('index', { title: "Funda", data:JSON.parse(data), replace: arg => arg.replace("/~","")  });
    });
});



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
