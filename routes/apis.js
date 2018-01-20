var express = require('express');
var router = express.Router();

var db = require("../models");

router.get('/products', function(req, res, next) {
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

router.get('/categories', function(req, res, next) {
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

router.get('/users', function(req, res, next) {
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
module.exports = router;
