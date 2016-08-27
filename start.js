var nodemon = require('nodemon');

nodemon({
	script: 'app.js',
	watch: []
}).on('start', function () {
  console.log('nodemon started');
}).on('crash', function () {
  console.log('script crashed for some reason');
}).on('quit', function () {
  console.log('script quit for some reason');
}).on('restart', function () {
  console.log('restart');
}).on('config:update', function () {
  console.log('config:update');  
});


