var express = require('express');
var router = express.Router();

var db = require("../models");
var Category = require("../models/category.js");

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log(req.user);
  res.render('index', {user: req.user})

});

router.post('/adduser', function(req, res){
	db.User.create({user_name: req.body.username, password: req.body.password}).then(() => {
		res.redirect('/');
	});
});

router.get('/products', function(req, res, next) {
  db.Product.findAll({
      include: [{all: true}]
  }).then((products) => {
    res.render('products', {products: products, user: req.user})
    var duck = 'category';
    console.log(products[0]);
  });
});

router.get('/products/clicks', function(req, res){
  db.Click.findAll({
  attributes: ['product_id',[db.sequelize.fn('COUNT', db.sequelize.col('id')), 'clickCount']],
  group: 'product_id'
  }).then((result) => {
    res.json({clicks:result, user: req.user.user_name});

  });
});

module.exports = router;
