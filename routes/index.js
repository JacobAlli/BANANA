var express = require('express');
var router = express.Router();

var db = require("../models");
var Category = require("../models/category.js");

/* GET home page. */
router.get('/', function(req, res, next) {
  db.User.findAll({
  }).then((users) => {
    res.render('index', {users: users})
  });
});

router.get('/products', function(req, res, next) {
  db.Product.findAll({
      include: [{all: true}]
  }).then((products) => {
    res.render('products', {products: products})
    var duck = 'category';
    console.log(products[0]);
  });
});
module.exports = router;
