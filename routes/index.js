var express = require('express');
var router = express.Router();

var db = require("../models");

/* GET home page. */
router.get('/', function(req, res, next) {
  db.User.findAll().then((users) => {
      res.render('index', {users: users})
  })
});

router.post('/adduser', function(req, res){
	db.User.create({user_name: req.body.username, password: req.body.password}).then(() => {
		res.redirect('/');
	});
});

module.exports = router;
