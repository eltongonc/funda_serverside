//require penthouse package to generate critical path css
var penthouse = require("penthouse")
    , fs = require('fs')
    , path = require('path')
    , __basedir = './';

//default configuration for penthouse
var config = {
    url: "http://localhost:3000",
    css : path.resolve(__dirname+"/public/css/style.css"),
    height : 900,
    width : 1300,
    strict: false,
    timeout: 30000
};


penthouse(config, function(err, criticalCss) {
    if (err) {
        // handle error
        throw err;
    }

    fs.writeFileSync(path.resolve(__dirname+'/public/css/critical.css'), criticalCss);
});
