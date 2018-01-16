var express = require('express');
var router = express.Router();

var db = require("../models");

/* GET home page. */
router.get('/', function(req, res, next) {
  db.User.findAll({
    // include: [{
    //   model: company,
    //   through: {
    //     attributes: ['company_name'],
    //   }
    // }]
  }).then((users) => {
    res.render('index', {users: users})
  });
});

router.get('/products', function(req, res, next) {
  db.Product.findAll({
    // include: [{
    //   model: company,
    //   through: {
    //     attributes: ['company_name'],
    //   }
    // }]
  }).then((products) => {
    res.render('products', {products: products})
  });
});

router.get('/api/products', function(req, res, next) {
  db.Product.findAll({
    // include: [{
    //   model: company,
    //   through: {
    //     attributes: ['company_name'],
    //   }
    // }]
  }).then((products) => {
    res.json(products)
  });
});

router.get('/api/categories', function(req, res, next) {
  db.Category.findAll({
    // include: [{
    //   model: company,
    //   through: {
    //     attributes: ['company_name'],
    //   }
    // }]
  }).then((categories) => {
    res.json(categories)
  });
});

router.get('/api/users', function(req, res, next) {
  db.User.findAll({
    // include: [{
    //   model: company,
    //   through: {
    //     attributes: ['company_name'],
    //   }
    // }]
  }).then((users) => {
    res.json(users)
  });
});


//clicks!

router.post("/add/click/", function(req, res) {
  db.Click.create({
      product_id: req.body.id}); 
  // function(result) {
    console.log(req.body.id);
    console.log('added click to db');
  // });
});
module.exports = router;
