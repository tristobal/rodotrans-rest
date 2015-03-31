/**
 * Require in the other controllers
 */
var account = require('./account.js');
var auth = require('./auth.js');

module.exports.set = function(app) {
	// Now set the routes from the other controllers
	account.set(app);
	auth.set(app);
};
