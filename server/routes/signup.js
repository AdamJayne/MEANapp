var router = require('express').Router();
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var mongoose = require('mongoose');
var User = require('')

router.post('/', function(req, res){
	var username = req.body.user.username;
	var pass = req.body.user.password;
	var email = req.body.user.email;
	User.Create()
});

module.exports = router;