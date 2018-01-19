var express = require('express');
var router = express.Router();

var db = require('../models');

router.get('/', function(req, res){
    res.render('login', {});
});

router.post('/', function(req, res){
    db.User.findAll({
        where: {
            user_name: req.body.username,
        },
    }).then((users) => {
        console.log(users);
    });
});

module.exports = router;

