'use strict'
var express = require('express');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var expressSession = require('express-session');
var mongoStore = require('connect-mongo')(expressSession);
var mongoose = require('mongoose');

require('./models/users_model.js');
var conn = mongoose.connect('mongodb://localhost/myapp');

mongoose.connection.on('connected', function(){
    console.log('Connection success!');
});
mongoose.connection.on('error', function(err){
    console.log('Connection error: ' + err);
});
mongoose.connection.on('disconnected', function(){
    console.log('Connection disconnected');
});

var app = express();
app.engine('.html', require('ejs').__express);
console.log(__dirname);
app.set('views', __dirname + '/views');
app.set('view engine', 'html');
//app.use(bodyParser());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());
app.use(cookieParser());
app.use(expressSession({
	secret: 'secret',
	resave: false,
	saveUninitialized: true,
	cookie: {maxAge: 60*60*10000},
	store: new mongoStore({   //创建新的mongodb数据库
		//url:'mongodb://localhost/conn',
		mongooseConnection: mongoose.connection,
		collection: 'sessions'
	})
}));

require('./routes')(app);
app.listen(8080, function(){
	console.log('Server listening at 8080')
});