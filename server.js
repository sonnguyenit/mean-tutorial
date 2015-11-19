var express = require('express');
var app = express();
var server = require('http').createServer(app);
var port = process.env.PORT || 3000;
var routes =require('./app/routes');
var mongoose = require('mongoose');
var db = require('./config/database');
mongoose.connect(db.url);

app.use(express.static(__dirname + '/public'));
routes(app);
server.listen(port);
console.log('Server is running on '+ port);
exports = module.exports=app;
