var fs = require('fs');
var express = require('express');

var app = express.createServer(express.logger());

var buf = new Buffer(20);

app.get('/', function(request, response) {
    fs.readFile('./index.html', function read (err, data) {
	if (err) {
            throw err;
	}
	content = data;
        response.send(buf);
    });
});

var port = process.env.PORT || 5000;
app.listen(port, function() {
  console.log("Listening on " + port);
});