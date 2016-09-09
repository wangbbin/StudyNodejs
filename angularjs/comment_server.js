var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var db = mongoose.connect('mongodb://localhost/comments');

require('./models/comments_model.js');
require('./models/photo_model.js');