var express = require("express");
var router = express.Router();

var db = require("../models");

router.get('/', function (req, res) {
    db.Cart.findAll({
        where: {
            user_id: 1
        }
    })
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

router.post('/update', function(req, res){
	res.send('SUP');
});

// router.delete('/', function(req, res) {
//     db.Cart.destroy({
//         where: {
//             user_id: 1
//         }
//     })
//     .then(function(carts) {
//         console.log(carts);
//         res.render("carts", {carts: carts});
//     });
// });
module.exports = router;