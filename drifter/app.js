var express = require('express');
var bodyParser = require('body-parser');
var redis = require('./models/redis.js');
var mongodb = require('./models/mongodb.js');

var app = express();
//CORS support
app.use( function(req, res, next) {

    res.set("Access-Control-Allow-Origin", "*");

    res.set("Access-Control-Allow-Headers", "accept, content-type");

    res.set("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");

    res.set("X-Powered-By",' 3.2.1')

    res.set("Content-Type", "application/json;charset=utf-8");

    next();

});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// 扔一个漂流瓶
// POST owner=xxx&type=xxx&content=xxx[&time=xxx]
app.post('/', function (req, res) {
	console.log(req.body)
  if (!(req.body.owner && req.body.type && req.body.content)) {
   return res.json({code: 0, msg: "信息不完整"});
  }
  if (req.body.type && (["male", "female"].indexOf(req.body.type) === -1)) {
    return res.json({code: 0, msg: "类型错误"});
  }
  redis.throw(req.body, function (result) {
    res.json(result);
  });
});

// 捡一个漂流瓶
// GET /?user=xxx[&type=xxx]
app.get('/', function (req, res) {
  if (!req.query.user) {
    return res.json({code: 0, msg: "信息不完整"});
  }
  if (req.query.type && (["male", "female"].indexOf(req.query.type) === -1)) {
    return res.json({code: 0, msg: "类型错误"});
  }
  redis.pick(req.query, function (result) {
    if (result.code === 1) {
      mongodb.save(req.query.user, result.msg, function (err) {
        if (err) {
          return res.json({code: 0, msg: "获取漂流瓶失败，请重试"});
        }
        res.json(result);
      });
      return;
    }
    res.json(result);
  });
});

// 获取一个用户所有的漂流瓶
// GET /user/nswbmw
app.get('/user/:user', function (req, res) {
  mongodb.getAll(req.params.user, function (result) {
    res.json(result);
  });
});

// 获取特定 id 的漂流瓶
// GET /bottle/529a8b5b39242c82417b43c3
app.get('/bottle/:_id', function (req, res) {
  mongodb.getOne(req.params._id, function (result) {
    res.json(result);
  });
});

// 回复特定 id 的漂流瓶
// POST user=xxx&content=xxx[&time=xxx]
app.post('/reply/:_id', function (req, res) {
  if (!(req.body.user && req.body.content)) {
    return callback({code: 0, msg: "回复信息不完整！"});
  }
  mongodb.reply(req.params._id, req.body, function (result) {
    res.json(result);
  });
});

// 删除特定 id 的漂流瓶
// GET /delete/529a8b5b39242c82417b43c3
app.get('/delete/:_id', function (req, res) {
  mongodb.delete(req.params._id, function (result) {
    res.json(result);
  });
});

app.listen(3000);