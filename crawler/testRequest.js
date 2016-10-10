var request = require('request');

// 通过 GET 请求来读取 http://cnodejs.org/ 的内容
request('http://cnodejs.org/', function (error, response, body) {
  if (!error && response.statusCode == 200) {
    // 输出网页内容
    console.log(body);
  }
});