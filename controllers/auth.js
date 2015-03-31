var express = require('express');
var UserModel = require('../models/user');
var jwt = require('jwt-simple');
var moment = require('moment');

module.exports.set = function(app) {
	app.post('/token', express.bodyParser(), function(req, res){

		if (req.body.username && req.body.password) {

			// Fetch the appropriate user, if they exist
			UserModel.findOne({ username: req.body.username }, function(err, user) {

				if (err || !user) {
					// user cannot be found; may wish to log that fact here. For simplicity, just return a 401
					res.send('Authentication error', 401);
				} else {
					user.comparePassword(req.body.password, function(err, isMatch) {
						if (err) {
							// an error has occured checking the password. For simplicity, just return a 401
							res.send('Authentication error', 401);
						} else {
							if (isMatch) {

								// Great, user has successfully authenticated, so we can generate and send them a token.
								var expires = moment().add('days', 7).valueOf();
								var token = jwt.encode(
									{
										iss: user.id,
										exp: expires
									},
									app.get('jwtTokenSecret')
								);
								res.json({
									token : token,
									expires : expires,
									user : user.toJSON()
								});
							} else {
								// The password is wrong...
								res.send('Authentication error', 401);
							}
						}
					});
				}
			});
		} else {
			// No username provided, or invalid POST request. For simplicity, just return a 401
			res.send('Authentication error', 401);
		}
	});

};
