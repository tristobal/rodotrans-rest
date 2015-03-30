/**
 * Load up the project dependencies
 */
var express = require('express');
var colors = require('colors');
var mongoose = require('mongoose');
var url = require('url');
var jwt = require('jwt-simple');

/**
 * Import the model(s)
 */
var UserModel = require('./models/user');

/**
 * THe JWT middleware
 */
var jwtauth = require('./lib/jwtauth');

/**
 * Connect to the database
 */
mongoose.connect('mongodb://localhost/jwttest');

/**
 * Create the express app
 * NOTE: purposely not using var so that app is accesible in modules.
 */
app = express();
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


/**
 * Set the secret for encoding/decoding JWT tokens
 */
app.set('jwtTokenSecret', 'secret-value');

/**
 * A simple middleware to restrict access to authenticated users.
 */
var requireAuth = function(req, res, next) {
	if (!req.user) {
		res.end('Not authorized', 401);
	}	else {
		next();
	}
};

/**
 * Load up the controllers
 */
var controllers = require('./controllers');
controllers.set(app);

/**
 * Start listening
 */
var server = app.listen(3001, function() {
	console.log('Listening on port %d'.green, server.address().port);
});

/**
 * An example protected route.
 */
app.get('/secret', express.bodyParser(), jwtauth, requireAuth, function(req, res){
	res.send('Hello ' + req.user.username);
});