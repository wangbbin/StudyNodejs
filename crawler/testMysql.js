var mysql = require('mysql');

// 创建数据库连接
var connection = mysql.createConnection({
  host:     'localhost',
  user:     'root',
  password: 'root',
});
connection.connect();

// 执行查询
connection.query('show databases', function(err, rows) {
  if (err) throw err;

  rows.forEach(function(item){
  	  console.log('The solution is: ' + item.Database);
  	});

  // 关闭连接
  connection.end();
});