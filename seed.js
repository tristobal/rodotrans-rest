/**
 * Seed.js - seeds the database. I.e. it creates a dummy user.
 */

var colors = require('colors');
var mongoose = require('mongoose');

/**
 * Import the model(s)
 */
var UserModel = require('./models/user');

/**
 * Connect to the database
 */
mongoose.connect('mongodb://user_db:pass_db@ds029051.mongolab.com:29051/mongotest', function(err, res) {
//mongoose.connect('mongodb://localhost/jwttest', function(err, res) {
  if(err) {
    console.log('ERROR: connecting to Database. ' + err);
  } else {
    console.log('Connected to Database'.green);
  }
});

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'Failed to connect to database!'.red));

db.once('open', function callback () {

	var user = new UserModel();
	user.username = 'lorem';
	user.password = 'ipsum';

	user.save(function(err){
		if (err) {
			console.log('Could not save user.'.red);
		} else {
			console.log('Database seeded'.green);
		}

		process.exit();
	});

});
