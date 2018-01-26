var express = require("express");
var router = express.Router();

var db = require("../models");

router.get('/', function (req, res) {
    db.Cart.findAll({})
    .then(function(carts){
        console.log(carts);
        res.render("carts", {carts: carts});    
    });
});

router.delete('/', function (req, res) {
    db.Cart.destroy({})
    .then(function(carts){
        console.log(carts);
        res.json(carts);    
    });
});

module.exports = router;