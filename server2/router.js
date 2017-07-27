var Auth = require('./controllers/auth');
var passportService = require('./services/passport');
var passport = require('passport');
var requireAuth = passport.authenticate('jwt', {session: false});
var requireSignin = passport.authenticate('local', {session: false});

module.exports = function(app){
	app.get('/', requireAuth, function(req,res){
		res.send({message: 'hey'});
		// res.send({hi: 'there'});
	});
	app.post('/api/signup', Auth.signup);
	app.post('/api/signin', requireSignin, Auth.signin);
	app.get('/api/currentProfile', requireAuth, Auth.fetch);
	app.put('/api/currentProfile', requireAuth, Auth.update);
	app.get('/api/profiles', Auth.fetchAll);
	app.delete('/api/delete', requireAuth, Auth.delete);
}