var mongoClient = require('mongodb').MongoClient;

mongoClient.connect('mongodb://localhost/admin1', function(err, db){
	var adminDb = db.admin();
	adminDb.listDatabases(function(err, database){
		console.log(database);
	});
});