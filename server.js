
/**
 * Module dependencies
 */

var fs = require('fs');
var express = require('express');
var mongoose = require('mongoose');
var passport = require('passport');
var config = require('config');

var app = express();
var port = process.env.PORT || 3000;

// Connect to mongodb
var connect = function () {
  var options = { server: { socketOptions: { keepAlive: 1 } } };
  mongoose.connect(config.db, options);
};
connect();

mongoose.connection.on('error', console.log);
mongoose.connection.on('disconnected', connect);

console.log(__dirname);
// Bootstrap models
fs.readdirSync(__dirname + '/server/routes/root/models/').forEach(function (file) {
  if (~file.indexOf('.js')) require(__dirname + '/server/routes/root/models/' + file);
});

// Bootstrap passport config
require('./server/passport')(passport, config);

// Bootstrap application settings
require('./server/express')(app, passport);

// Bootstrap routes
require('./server/routes')(app, passport);

app.listen(port);
console.log('Express app started on port ' + port);
