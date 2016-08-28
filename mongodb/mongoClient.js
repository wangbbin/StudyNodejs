var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://localhost:27017/dbname';
var options = {
	db: { w:1, native_parser: false},
	server: {
		poolSize: 5,
		socketOptions: { connectTimeoutMS:5},
		auto_reconnect: true
	},
	replSet: {},
	mongos: {}
};
MongoClient.connect(url, options, function(err, db) {
	if(err){
		console.error(err);
		return;
	}else{
		console.log("Connected correctly to server");
		db.close();
	}
});

/*//method 1
var mongodb = require('mongodb'),
		Server = mongodb.Server;
var server = new Server('localhost', 27017, {
		socketOptions: { connectTimeoutMS: 500},
		poolSize: 5,
		auto_reconnect: true
	});

var  db = new mongodb.Db('mydb', server, {safe:true});
db.open(function(err, db){
    if(!err){
        console.log('connect db');
        // 连接Collection（可以认为是mysql的table）
        // 第1种连接方式
        // db.collection('mycoll',{safe:true}, function(err, collection){
        //     if(err){
        //         console.log(err);
        //     }
        // });
        // 第2种连接方式
        db.createCollection('mycoll', {safe:true}, function(err, collection){
            if(err){
                console.log(err);
            }else{
                //新增数据
                // var tmp1 = {id:'1',title:'hello',number:1};
       //          collection.insert(tmp1,{safe:true},function(err, result){
       //              console.log(result);
       //          }); 
                   //更新数据
                   // collection.update({title:'hello'}, {$set:{number:3}}, {safe:true}, function(err, result){
                   //     console.log(result);
                   // });
                   // 删除数据
                       // collection.remove({title:'hello'},{safe:true},function(err,result){
        //                   console.log(result);
        //               });

                // console.log(collection);
                // 查询数据
                var tmp1 = {title:'hello'};
                   var tmp2 = {title:'world'};
                   collection.insert([tmp1,tmp2],{safe:true},function(err,result){
                   console.log(result);
                   }); 
                   collection.find().toArray(function(err,docs){
                   console.log('find');
                   console.log(docs);
                   }); 
                   collection.findOne(function(err,doc){
                    console.log('findOne');
                      console.log(doc);
                   }); 
            }

        });
        // console.log('delete ...');
        // //删除Collection
        // db.dropCollection('mycoll',{safe:true},function(err,result){

  //           if(err){
                
        //         console.log('err:');
        //         console.log(err);
        //     }else{
        //         console.log('ok:');
        //         console.log(result);
        //     }
  //       }); 
    }else{
        console.log(err);
    }
});*/

/*//book
var mongodb = require('mongodb'),
		Server = mongodb.Server;
var server = new Server('localhost', 27017, {
		socketOptions: { connectTimeoutMS: 500},
		poolSize: 5,
		auto_reconnect: true
	});
var client = new mongodb.MongoClient(server,{
		numberOfRetries: 3,
		retryMilliSeconds: 600
	});
//err: client do not have open function
client.open(function(err, client){
	if(err){
		console.log('Connection Failed!');
	} else{
		var db = client.db('testDB');
		if(db){
			console.log('Connection Via Client Object');
			db.authenticate('dbadmin', 'test', function(err, results){
				if(err){
					console.log('Authertication Failed!');
					client.close();
					console.log('Client Close');
				}else{
					console.log('authenticate via Client object');
					db.logout(function(err, result){
						if(!err){
							console.log('layout via client object');
						}
						client.close();
						console.log('Connetion closed');
					});
				}
			});
		}
	}
});*/