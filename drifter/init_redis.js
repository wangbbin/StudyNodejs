var request = require('request');

for (var i = 1; i <= 2; i++) {
  (function(i) {
    request.post({
      url: "http://127.0.0.1:3000",
      json: {"owner": "bottle" + i, "type": "male", "content": "content" + i}
    });
  })(i);
}

for (var i = 3; i <= 4; i++) {
	(function(i) {
		request.post({
			url: "http://127.0.0.1:3000",
			json: {"owner": "bottle" + i, "type": "female", "content": "content" + i}
		}, function (error, response, body) {
			if (!error && response.statusCode == 200) {
		    console.log(body) // Show the HTML for the Google homepage.
		  }
		});
  })(i);
}