var express = require('express');
var app = express();
var id =1;
function queryRemover(req, res, next){
	console.log('\nBefore Url: ' + id++);
	console.log(req.url);

	//req.url = req.url.split('?')[0];
	//req.url = '/no';
	console.log('\nAfter Url: ');
	console.log(req.url);
	
	next();
}

app.use(queryRemover);

app.get('/no/query', function(req, res){
	//res.send("test");

	res.redirect('/no/redirect');
});

app.get('/no', function(req, res){
	//res.send('redirect no!');
});

app.get('/no/redirect', function(req, res){
	res.send('redirectQ');
});

app.listen(8080);