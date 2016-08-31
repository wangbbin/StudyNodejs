var express = require('express');
var app = express();

app.use('/', express.static('./static', {maxAge: 60*60*1000, index: 'otherIndex.html'}));

app.use('/images', express.static('./image'));

app.listen(8080);