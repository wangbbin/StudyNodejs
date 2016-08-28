var mongoClient = require('mongodb').MongoClient;
mongoClient.connect('mongodb://localhost', function(err, db){
	var newDB = db.db('newDb');
	newDB.createCollection('newCollection', function(err, collection){
		if(!err){
			console.log('create collection success')
		}
	});
})