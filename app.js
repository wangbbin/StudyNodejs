var fs = require('fs');
var http = require('http');
var url = require('url');
var ROOT_DIR = 'html/';

var message = ['a', 'b', 'ccc'];
http.createServer(function(req, res){

	/*//static
	var urlObj = url.parse(req.url, true, false);
	console.dir(urlObj);
	fs.readFile(ROOT_DIR + urlObj.pathname + 'index.html', function(err, data){
		if(err){
			res.writeHead(404);
			res.end(JSON.stringify(err));
			return;
		}
		res.writeHead(200);
		res.end(data);
	});*/

	/*res.setHeader('Content-Type','text/html');
	res.writeHead(200);
	res.write('<html><head><title>Simple Http S</title></head>');
	res.write('<body>');
	for (var i = message.length - 1; i >= 0; i--) {
		res.write('\n<h1>' + message[i] + '</h1>');
	};

	res.end('</body></html>');*/

	var jsonData = '';
	req.on('data', function(chunk){
		jsonData += chunk;
	});

	req.on('end', function(){
		console.log('req end' + jsonData);
		var reqObj = JSON.parse(jsonData);
		var resObj = {
			message: 'Hello' + reqObj.name,
			question: 'Are you a good ' + reqObj.occupation + '?'
		};
		res.writeHead(200);
		res.end(JSON.stringify(resObj));
	});
 
}).listen(8080);
