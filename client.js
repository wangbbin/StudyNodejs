var http = require('http');
var options = {
	hostname: 'localhost',
	port: 8080/*,
	path: '/'*/
};

function handleReponse(response){
	var serverData = '';
	response.on('data', function(chunk){
		serverData += chunk;
	});
	response.on('end', function(){
		console.log(serverData);
	});
}

http.request(options, function(response){
	handleReponse(response);
}).end();