var express = require('express');
var url = require('url');
var http = require('http');

var app = express();

var server = http.createServer(app).listen(8080);

app.get('/', function(req, res){
	res.send('Hello from Expresss!');
});

app.get('/user/:userid',function(req, res){
	var response = 'Get User: ' + req.params.userid;//instead req.param('userid')

	console.log('\nParam url ', req.originalUrl);
	console.log(response);
	res.send(response);
});

app.param('userid', function(req, res, next, value){

	console.log('\nRequest received with userid: '+ value);
	next();
});