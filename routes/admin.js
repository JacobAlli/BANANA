var express = require('express');
var router = express.Router();

var db = require("../models");

router.get('/users', function(req, res){
    db.User.findAll({}).then((users) => {
        var usersFromDB = users;
        res.render('userAdmin', {loggedUser: req.user, users: usersFromDB});
    });
});

router.post('/users/delete', function(req, res){
    db.User.findById(req.body.id).then((user) => {
        if(req.body.status === "true"){
            user.active = 0;
        }
        else{
            user.active = 1;
        }
        user.save();
        res.redirect('/admin/users');
    });
});

router.post('/users/update', function(req, res){
    console.log(req.body.userType);
    db.User.findById(req.body.id).then((user) => {
        if(req.body.userType === '1'){
            user.user_type = 1;
        }
        else{
            user.user_type = 0;
        }
        user.save();
        res.redirect('/admin/users');
    });
});

router.get('/products', function(req, res){
    db.Product.findAll({}).then((result) => {
        res.render('productAdmin', {loggedUser: req.user, products: result});
    });
});

module.exports = router;