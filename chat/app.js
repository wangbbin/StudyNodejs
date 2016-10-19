var express = require('express');
var logger = require('morgan');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var async = require('async');
var Controllers = require('./controllers');

var signedCookieParser = cookieParser('technode');
var MongoStore = require('connect-mongo')(session);
var sessionStore = new MongoStore({
	url: 'mongodb://localhost/technode'
});
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());
app.use(cookieParser());
app.use(session({
	secret: 'technode',
	resave: true,
	saveUninitialized: false,
	cookie: {maxAge: 60*100000},
	store: sessionStore
}));

var port = process.env.PORT || 3000;
//app.use(logger('dev'));
app.use(express.static(path.join(__dirname, '/static')));

app.get('/api/validate', function (req, res){
	var _userId = req.session._userId;
	if (_userId){
		Controllers.User.findUserById(_userId, function (err, user){
			if (err){
				res.status(401).json({
					msg: err
				});
			} else {
				res.json(user);
			}
		});
	} else {
		res.status(401).json(null);
	}
});

app.post('/api/login', function (req, res){
	var email = req.body.email;
	if (email){
		Controllers.User.findByEmailOrCreate(email, function (err, user){
			if (err){
				res.status(500).json({
					msg: err
				});
			} else {
				req.session._userId = user._id;
				Controllers.User.online(user._id, function (err, user){
					if (err) {
						res.status(500).json({
							msg: err
						});
					} else {
						res.json(user);
					}
				});
			}
		});
	} else {
		res.json(403);
	}
});

app.get('/api/logout', function (req, res){
	var _userId = req.session._userId;
	Controllers.User.offline(_userId, function (err, user){
		if (err) {
			res.status(500).json({
				msg: err
			});
		} else {
			req.session.destroy(function(){
					res.json(200);
			});
		}
	});
});

app.use(function (req, res){
	console.log(req.url, 'url')
	res.sendFile(path.join(__dirname, './static/index.html'));
});

var server = app.listen(port, function(){
	console.log('server start on port' + port);
});

var io = require('socket.io').listen(server);

//socket.io authorization
io.set('authorization', function (handshakeData, accept){
	signedCookieParser(handshakeData, {}, function (err){
		if (err){
			accept(err, false);
		} else {
			sessionStore.get(handshakeData.signedCookies['connect.sid'], function (err, session){
				
				if (err) {
					accept(err.message, false);
				} else {
					handshakeData.session = session;
					//console.log('session', handshakeData)
					if (session && session._userId) {
						accept(null, true);
					} else {
						accept('No Login');
					}
				}
			});
		}
	});
});
var i = 0
io.sockets.on('connection', function(socket){
	//console.log(socket.request === handshakeData???)
	//user online or offline
	//console.log(socket.rooms)
	var _userId = socket.request.session._userId;
	Controllers.User.online(_userId, function (err, user){
		if (err) {
			socket.emit('err', {
				msg: err
			});
		} else {
			socket.broadcast.emit('online', user);
			// socket.broadcast.emit('messageAdded', {
			// 	content: user.name + 'Enter the chat room',
			// 	creator: {name: 'SYSTEM'},
			// 	createAt: new Date()
			// });
		}
	});

	/*socket.on('getRoom', function (){
		async.parallel([
				function (done){
					Controllers.User.getOnlineUsers(done);
				},
				function (done){
					Controllers.Message.read(done);
				}
			], function (err, results){
				if (err) {
					socket.emit('err', {
						msg: err
					});
				} else {
					socket.emit('roomData', {
						users: results[0],
						messages: results[1]
					});
				}
			});
	});*/

	socket.on('createMessage', function (message){
		console.log(socket.rooms, 'cm')
		Controllers.Message.create(message, function (err, message){
			if (err) {
				socket.emit('err', {
					msg: err
				});
			} else {
				socket.in(message._roomId).broadcast.emit('messageAdded', message);
				socket.emit('messageAdded', message);
			}
		})
	});

	/*socket.on('disconnect', function (){
		Controllers.User.offline(_userId, function (err, user){
			if (err) {
				socket.emit('err', {
					msg: err
				});
			} else {
				socket.broadcast.emit('offline', user);
				socket.broadcast.emit('messageAdded', {
					content: user.name + 'Leave the chat room',
					creator: {name: 'SYSTEM'},
					createAt: new Date()
				});
			} 
		});
	});*/

	socket.on('createRoom', function (room){
		Controllers.Room.create(room, function (err, room){
			if (err){
				socket.emit('err', {
					msg: err
				});
			} else {
				var newRoom = room.toObject();
				newRoom.users = []
				io.sockets.emit('roomAdded', newRoom);
			}
		});
	});

	socket.on('getAllRooms', function (data){
		if (data && data._roomId) {
			Controllers.Room.getById(data._roomId, function (err, room){
				if (err){
					socket.emit('err', {
						msg: err
					});
				} else {
					socket.emit('roomData.' + data._roomId, room);
				}
			})
		} else {
			Controllers.Room.read(function (err, rooms){
				if (err){
					socket.emit('err', {
						msg: err
					});
				} else {
					socket.emit('roomsData', rooms);
				}
			});
		}
	});

	socket.on('joinRoom', function (join){
		Controllers.User.joinRoom(join, function (err){
			if (err){
				socket.emit('err', {
					msg: err
				});
			} else {
				socket.join(join.room._id);
				socket.emit('joinRoom.' + join.user._id, join);
				socket.in(join.room._id).broadcast.emit('messageAdded', {
					content: join.user.name + ' join ',
					creator: {name: 'SYSTEM'},
					createAt: new Date(),
				});
				socket.in(join.room._id).broadcast.emit('joinRoom', join);
			}
		});
	});

	socket.on('leaveRoom', function (leave){
		console.log(socket.rooms, 'l')
		Controllers.User.leaveRoom(leave, function (err){
			if (err){
				socket.emit('err', {
					msg: err
				});
			} else {
				socket.in(leave.room._id).broadcast.emit('messageAdded', {
						content: leave.user.name + ' leave',
						creator: {name: 'SYSTEM'},
						createAt: new Date()
				});
				socket.leave(leave.room._id);
				io.sockets.emit('leaveRoom', leave);
			}
		});
	});

	socket.on('disconnect', function (){
		console.log(socket.rooms, 'c')
		Controllers.User.offline(_userId, function (err, user){
			if (err) {
				socket.emit('err', {
					msg: err
				});
			} else {
				if (user._roomId) {
					socket.in(user._roomId).broadcast.emit('leaveRoom', user);
					socket.in(user._roomId).broadcast.emit('messageAdded', {
						content: user.name + ' leave',
						creator: {name: 'SYSTEM'},
						createAt: new Date()
					});
					Controllers.User.leaveRoom({
						user: user
					}, function(){});
				}
			}
		})
	});

});