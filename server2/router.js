var Auth = require('./controllers/auth');
var User = require('./models/user');

module.exports = function(app){
	app.post('/signup', Auth.signup);
}