var express = require('express');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var mongoose = require('mongoose');
var http = require('http');

var app = express();

mongoose.connect('localhost')
var db = mongoose.connection;
db.on('error', function(e) {
	console.log(e);
});
db.once('open', function() {
	console.log("Database connected")
});


app.use(express.static('App'))
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({'extended': 'true'}));
app.use(bodyParser.json());

var server = http.createServer(app);
server.listen(3000, function() {
	console.log("Server Running");
})

app.use(function(req, res, next) {
	console.log('after bodyParser', req.body); 
	next();
})



//Default router
app.use('/', function(req, res, next) {

	res.sendFile(__dirname+'App/index.html')
})

app.use('*', function(req, res, next) {

	res.status(404).end()
})

//Error Handler
app.use(function(err, req, res, next) {
	res.status(err.status).send(err.message)
})