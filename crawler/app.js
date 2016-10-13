var path = require('path');
var express = require('express');
var read = require('./web/read');
var config = require('./config');

var app = express();

// 配置 express

  app.set('views', __dirname + '/views');
  //app.set('view engine', 'html');//模板引擎 默认使用的扩展名
  app.engine('html', require('ejs').__express);//用ejs 模板引擎 来处理 ".html" 后缀的文件:
  app.use('/public', express.static(path.join(__dirname, 'public')));


// 网站首页
app.get('/', function(req, res, next){
  // articleListByClassId 的第一个参数是文章分类的 ID
  // 第二个参数是返回结果的开始位置
  // 第三个参数是返回结果的数量
  read.articleListByClassId(0, 0, 20, function (err, list) {
    if (err) return next(err);

    // 渲染模板
    res.locals.articleList = list;
    res.render('index.html');
  });
});

// 文章页面
app.get('/article/:id', function (req, res, next) {
  // 通过 req.params.id 来取得 URL 中 :id 部分的参数
  read.article(req.params.id, function (err, article) {
    if (err) return next(err);

    // 渲染模板
    res.locals.article = article;
    res.render('article.html');
  });
});

app.listen(config.port);
console.log('服务器已启动');