var User = require('../models/user');
var jwt = require('jwt-simple');
var config = require('../config');

function createUserToken(user){
	var timestamp = new Date().getTime();
	return jwt.encode({sub: user._id, iat: timestamp}, config.secret);
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
				res.json({token: createUserToken(user), id: user._id});
			});
		});
	});
}

exports.signin = function(req, res, next){	
	res.send({token: createUserToken(req.user), id: req.user._id});
}

exports.fetch = function(req, res, next){
	var id = req.user._id;
	User.findOne({_id: id}, function(err, user){
		if(err){
			return res.status(400).send('bad data');
		}
		if(user){
			return res.send(user);
		} else {
			res.status(404).send('User not found');
		}
	});
}

exports.fetchAll = function(req,res,next){
	User.find(function(err, users){
		if(err){
			return res.status(400).send('bad data');
		}
		if(users){
			res.send(users)
		} else {
			res.status(404).send('there are no users');
		}
	});
}

exports.update = function(req, res, next){
	console.log(req.body.user);
	var id = req.user.id;
	var username = req.body.user.username;
	var email = req.body.user.email;
	var password = req.user.password
	var profession = req.body.user.profession;
	var street = req.body.user.street;
	var city = req.body.user.city;
	var state = req.body.user.state;
	var description = req.body.user.description;
	var url = req.body.user.url;

	
	User.findOneAndUpdate({_id: id}, {username: username||req.user.username, email: email||req.user.email, profession: profession||req.user.profession, address: {street: street||req.user.address.street, city: city||req.user.address.city, state: state||req.user.address.state}, description:description||req.user.description, contact:{ url: url||req.user.contact.url}} , function(err, user){
		if(err){
			return res.status(400).send('bad data');
		}
		res.send("updated");
	});
	
}