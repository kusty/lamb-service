require('./model');
const mongoose = require('mongoose');
const config = require('./config');

mongoose.connect(config.mongo.uri);

// mongoose promise 风格 [mongoose.Promise = require('bluebird')]
mongoose.Promise = global.Promise;
module.exports = mongoose;
