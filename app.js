var http = require('http');
var url = require('url');
var queryString = require('querystring');

function sendResponse(weatherData, res){
	var page = '<html><head><title>External Example</title></head>' +
							'<body>' +
							'<form method="post">' +
							'City: <input name="city">' +
							'<input type="submit" value="Get Weather">' +
							'</form>';
	if(weatherData){
		page += '<h1>weather info</h1><p>' +weatherData+'</p>'; 
	}
	page += '</body></html>';
	res.end(page);
}

function parseWeather(weatherResponse, res){
	var weatherData = 'how beaty';
	weatherResponse.on('data', function(chunk){
		weatherData += chunk;
	});
	weatherResponse.on('end', function(){
		sendResponse(weatherData, res);
	});
}

function getWeather(city, res){

	var options = {
		host: 'api.openweathermap.map',
		path: '/data/2.5/weather?q=' + city
	};
	http.request(options, function(weatherResponse){
		console.log('getWeather back');
		parseWeather(weatherResponse, res);
	}).end();
}

http.createServer(function(req, res){
	console.log(req.method);
	if(req.method == 'POST'){
		var reqData = '';
		req.on('data', function(chunk){
			reqData += chunk;
		});
		req.on('end', function(){
			var postParams = queryString.parse(reqData);
			getWeather(postParams.city, res);
		});

	}else{
		sendResponse(null, res);
	}
}).listen(8080);
