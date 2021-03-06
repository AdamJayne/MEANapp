var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
var Schema = mongoose.Schema;

var userSchema = new Schema({
	username: {type: String,
				 unique: true},
	email: {type: String,
			unique: true,
			lowercase: true},
	password: {type: String},
	usertype: {type: String},
	profession: {type: String},
	address: {
		street: {type: String},
		city: {type: String},
		state: {type: String}
	},
	contact: {
		email: {type: String},
		url: {type: String},
		phone: {type: String}
	},
	description: {type: String}
});

userSchema.pre('save', function(next){
	var user = this;
	bcrypt.genSalt(10, function(err, salt){
		if(err){return next(err);}
		bcrypt.hash(user.password, salt, null, function(err, hash){
			if(err){return next(err);}
			user.password = hash;
			next();
		});
	});
});

userSchema.methods.comparePassword = function(candidatePassword, callback){
	bcrypt.compare(candidatePassword, this.password, function(err, isMatch){
		if(err){
			return callback(err);
		}
		callback(null, isMatch);
	});
}

var model = mongoose.model('user', userSchema);

module.exports = model;