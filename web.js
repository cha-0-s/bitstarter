var fs = require('fs');
var express = require('express');

var app = express.createServer(express.logger());

var buf = new Buffer(20);

app.get('/', function(request, response) {
    buf =  fs.readFile('./index.html');
    response.send(buf);
});

var port = process.env.PORT || 5000;
app.listen(port, function() {
  console.log("Listening on " + port);
});