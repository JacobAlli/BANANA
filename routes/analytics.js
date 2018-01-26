var express = require('express');
var router = express.Router();

var db = require("../models");

router.post("/add/click", function(req, res) {
  db.Click.create({
      product_id: req.body.id});
  // function(result) {
    console.log(req.body.id);
    console.log('added click to db');
  // });
  res.sendStatus(200);
});

router.get('/analytics/', function(req, res, next) {
  db.Product.findAll({
      include: [{all: true}]
  }).then((products) => {
    res.render('analytics', {products: products, user: req.user})
    console.log(products[0]);
  });
});

router.get('/analytics/products', function(req, res, next) {
  db.Product.findAll({
      include: [{all: true}]
  }).then((products) => {
    res.render('analyticsprod', {products: products, user: req.user})
    console.log(products[0]);
  });
});

router.post("/add/cart", function (req, res) {
  // console.log(req.body);
  db.Cart.create({
    order_id: 1,
    item_id: 1,
    short_desc: "Banana",
    category_id: 3,
    user_id: 2,
    price: 350,
    qty: 1
  })
  .then((cart)=> {
    console.log(req.body.id);
    console.log('added product to cart');
    alert("added product to cart");
    // });
    res.sendStatus(200);
  });
  // function(result) {
});

module.exports = router;

