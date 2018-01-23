var express = require("express");
var router = express.Router();

var db = require("../models");

router.get('/', function (req, res) {
    db.Order.findAll({})
    .then(function(orders){
        console.log(orders);
        res.render("orders", {orders: orders});    
    });
});
module.exports = router;