// MySQL数据库连接配置
var mysql = require('mysql');
exports.db = mysql.createConnection({
  host:            '127.0.0.1',   // 数据库地址
  port:            3306,          // 数据库端口
  database:        'sina_article',   // 数据库名称
  user:            'root',        // 数据库用户
  password:        'root'             // 数据库用户对应的密码
});

// 博客配置
exports.sinaBlog = {
  url: 'http://blog.sina.com.cn/u/1776757314'  // 博客首页地址
};

// Web服务器端口
exports.port = 3000;