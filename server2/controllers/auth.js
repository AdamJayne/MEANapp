var User = require('../models/user');
var jwt = require('jwt-simple');
var config = require('../config');

function createUserToken(user){
	var timestamp = new Date().getTime();
	return jwt.encode({sub: user.id, iat: timestamp}, config.secret);
}

exports.signup = function(req, res, next){
	var username= req.body.username;
	var email= req.body.email;
	var password= req.body.password;
	var usertype= req.body.usertype;
	var profession= req.body.profession;
	var address= req.body.address;
	var contact= req.body.contact;

	if(!username || !email || !password){
		return res.status(418).send({error: 'You must provide username, email and password'});
	}

	User.findOne({username: username}, function(err, existingUser){
		if(err) {
			return next(err);
		} //handles the search error
		if(existingUser){
			return res.status(418).send("Username is taken");
		}
		User.findOne({email: email}, function(err, existingUser){
			if(err){
				return next(err);
			} //handles the search error
			if(existingUser){
				return res.status(418).send("Email already has a user assigned to it");
			}
			var user = new User({
			username: username,
			email: email,
			password: password,
			usertype: usertype,
			profession: profession,
			address: address,
			contact: contact
			});
			user.save(function(err){
				if(err) {return next(err);}
				res.json({token: createUserToken(user)});
			});
		});
	});
}