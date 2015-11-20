var express = require('express');
var app = express();
var server = require('http').createServer(app);
var port = process.env.PORT || 3000;
var routes =require('./app/routes');
var mongoose = require('mongoose');
var db = require('./config/database');
mongoose.connect(db.url);
var bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.json({type:'application/vnd.api+json'}));
app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static(__dirname + '/public'));
routes(app);
server.listen(port);
console.log('Server is running on '+ port);
exports = module.exports=app;
