var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var mongoDB = 'mongodb://localhost:27017/'

mongoose.connect(mongoDB);
require('dotenv').config();

app.use(bodyParser.json());

app.use('/api/signup', require('./routes/signup'));