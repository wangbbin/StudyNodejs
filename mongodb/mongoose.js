var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
	username: {type: String, unique: true},
	email: String,
	color: String,
	hashed_password: String
});

//working for mongoose.connect 
//not working when use createConnection
mongoose.connection.on('connected', function(){
    console.log('Connection success!');
});
mongoose.connection.on('error', function(err){
    console.log('Connection error: ' + err);
});
mongoose.connection.on('disconnected', function(){
    console.log('Connection disconnected');
});

/*		//1
		var db = mongoose.createConnection('localhost','myapp'); //创建一个数据库连接
		db.on('error',console.error.bind(console,'连接错误:'));
		
		db.once('open',function(){
			//一次打开记录
			var Users = db.model('Users', UserSchema);
			var user = new Users({username: 'wang1'});
			user.save(function (err, user){
				console.log('Save Success!' + user)
			});
		});
*/

//2
var db = mongoose.connect('mongodb://localhost/myapp');
var User = mongoose.model('Users', UserSchema);

setTimeout(function (){
	mongoose.disconnect();
}, 3000);

var user = new User({username: 'www',email: 'www1'});
	user.save(function (err, doc){
				console.log('Save Success!' + err + doc)
			});
/*
//3
var db = mongoose.connect('mongodb://localhost/myapp');
var User = mongoose.model('Users', UserSchema);

setTimeout(function (){
	mongoose.disconnect();
}, 3000);

mongoose.connection.once('open', function (){
	var user = new User({username: 'www',email: 'www1'});
	user.save(function (err, doc){
				console.log('Save Success!' + err + doc)
			});
});*/