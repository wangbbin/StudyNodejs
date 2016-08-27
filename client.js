var http = require('http');
var options = {
	hostname: 'localhost',
	port: 8080,
	path: '/',
	method: 'post'
};

/*function handleReponse(response){
	var serverData = '';
	response.on('data', function(chunk){
		serverData += chunk;
	});
	response.on('end', function(){
		console.log('response status: ' , response.statusCode);
		console.log('response Header: ', response.headers)
		console.log(serverData);
	});
}*/

function handleReponse(response){
	var serverData = '';
	response.on('data', function(chunk){
		serverData += chunk;
	});
	response.on('end', function(){
		var resObj = JSON.parse(serverData);
		console.log('Raw response: ' , resObj);
		console.log('Message: ', resObj.message);
		console.log('Q :' , resObj.question);
	});
}

var req = http.request(options, function(response){
	handleReponse(response);
});
req.write(JSON.stringify({name: "wang", occupation: "Angular"}));
req.end();