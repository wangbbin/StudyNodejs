var express = require('express');
var logger = require('morgan');
var app = express();
var path = require('path');

var port = process.env.PORT || 3000;
app.use(logger('dev'));
app.use(express.static(path.join(__dirname, '/static')));
app.use(function (req, res){
	res.sendFile(path.join(__dirname, './static/index.html'));
});

var server = app.listen(port, function(){
	console.log('start');
});

var io = require('socket.io').listen(server);

io.sockets.on('connection', function(socket){
	socket.emit('connected');
});