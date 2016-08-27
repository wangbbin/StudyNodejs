var fs = require('fs');
var options = { encoding: 'utf8', flag: 'r'};

var fileReadStream = fs.createReadStream('grains.txt', options);
fileReadStream.on('data', function(chunk){
	console.log('Read : ', chunk);
	console.log('Read %d bytes of data.', chunk.length);
});
// setTimeout(function(){
// 	console.log('direct read: ', fileReadStream.read());
// },1000);


fileReadStream.on('close', function(){
	console.log('File, close');
});

