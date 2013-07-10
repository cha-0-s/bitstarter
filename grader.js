#!/usr/bin/env node
/*
Automatically grade files for the presence of specified HTML tags/attributes.
Uses commander.js and cheerio. Teaches command line application development
and basic DOM parsing.

References:

 + cheerio
   - https://github.com/MatthewMueller/cheerio
   - http://encosia.com/cheerio-faster-windows-friendly-alternative-jsdom/
   - http://maxogden.com/scraping-with-node.html

 + commander.js
   - https://github.com/visionmedia/commander.js
   - http://tjholowaychuk.com/post/9103188408/commander-js-nodejs-command-line-interfaces-made-easy

 + JSON
   - http://en.wikipedia.org/wiki/JSON
   - https://developer.mozilla.org/en-US/docs/JSON
   - https://developer.mozilla.org/en-US/docs/JSON#JSON_in_Firefox_2
*/

var fs = require('fs');
var program = require('commander');
var cheerio = require('cheerio');
var HTMLFILE_DEFAULT = "index.html";
var CHECKSFILE_DEFAULT = "checks.json";

var myArgs = require('optimist').argv;

/*var assertFileExists = function(infile) {
    var instr = infile.toString();
    if(!fs.existsSync(instr)) {
        console.log("%s does not exist. Exiting.", instr);
        process.exit(1); // http://nodejs.org/api/process.html#process_process_exit_code
    }
    return instr;
};*/


var cheerioHtmlFile = function(htmlfile) {
    var pagesrc;
    
      if (myArgs.file) {
      return cheerio.load(fs.readFileSync(htmlfile));
    }
    else if (myArgs.url) {
        var resultstr = rest.get(myArgs.url).on('complete', function(result,response) {
	   // console.log(result);  
	    $ = cheerio.load(result);
	    var checks = loadChecks(checksfile).sort();
	    var out = {};
	    for(var ii in checks) {
		var present = $(checks[ii]).length > 0;
		out[checks[ii]] = present;
	    }
            var outJson = JSON.stringify(out, null, 4);
	    console.log(outJson);
        });
//        console.log(resultstr.request);
	//return cheerio.load(resultstr);
     }
    else {
	//console.log("No source specified.");
        return null;
    }
};

var loadChecks = function(checksfile) {
    return JSON.parse(fs.readFileSync(checksfile));
};

var checkHtml = function(htmlfile, checksfile) {
    $ = cheerioHtmlFile(htmlfile);
    var checks = loadChecks(checksfile).sort();
    var out = {};
    for(var ii in checks) {
        var present = $(checks[ii]).length > 0;
        out[checks[ii]] = present;
    }
    //console.log($.toString());
    return out;
};

var clone = function(fn) {
    // Workaround for commander.js issue.
    // http://stackoverflow.com/a/6772648
    return fn.bind({});
};

var sys = require('util');
var rest = require('restler');
var checks = myArgs.checks || CHECKSFILE_DEFAULT;


if(require.main == module) {
    var checkJson = checkHtml(myArgs.url||myArgs.file, checks);
    var outJson = JSON.stringify(checkJson, null, 4);
    console.log(outJson);
} 
else {
    exports.checkHtmlFile = checkHtmlFile;
}