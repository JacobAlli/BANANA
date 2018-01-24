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
module.exports = router;