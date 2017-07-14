module.exports = function(mongoose){
	var userSchema = mongoose.Schema({
		user : {
			username: {type: String},
			email: {type: String},
			password: {type: String},
			usertype: {type: String},
			profession: {type: String},
			experience: {
				years: {type: Number, min: 0},
				months: {type: Number, min: 0}
			},
			address: {
				street: {type: String},
				city: {type: String},
				state: {type: String}
			},
			contact: {
				email: {type: String},
				weburl: {type: String},
				phone: {type: String}
			}
		}
	});
	return mongoose.model('User', userSchema);
}
