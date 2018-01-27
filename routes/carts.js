var express = require("express");
var router = express.Router();

var db = require("../models");

router.get('/', function (req, res) {
    db.Cart.findAll({
        where: {
            user_id: req.user.id
        }
    })
    .then(function(carts){
        carts.forEach((cart) => {
        	cart.totalPrice = cart.price * cart.qty;
        	console.log(cart.totalPrice);
        });
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
	
	var ajaxData = req.body;

	var dataLength = Object.keys(ajaxData).length;

	console.log(Object.keys(ajaxData).length);

	for(i=0; i< dataLength/5; i++){

		var cartID = ajaxData[`data[${i}][cartID]`];

		var qty = ajaxData[`data[${i}][qty]`];

		console.log(cartID);

		function findAndUpdate(cartID, qty, cb){
			db.Cart.findById(cartID).then((row) => {
				cb(cartID, qty, row);
			});
		}

		findAndUpdate(cartID, qty, function(cartID, qty, row){
			row.qty = qty;
			row.save();
		});

	}

	res.send(200);

});

router.post('/remove', function(req, res){
	console.log(req.body);

	db.Cart.findOne({
        where: {
            id: parseInt(req.body.data)
        }
    })
    .then(function(cart) {
        cart.destroy();
        res.send('carts')
    });
});

router.post('/checkout', function(req, res){
	console.log(req.body.totalPrice);

    db.Order.create({
    	short_desc: 'your order lolol',
        category_id: 1,
        create_date: 1,
        company_id: 1,
        qty: 1,
    	user_id: req.user.id, 
    	price: req.body.totalPrice}
    ).then((order) => {
    	console.log(order);
    	deleteCart(req);
    	res.send({order: order, location: '/'});
    });

});

function deleteCart(req){
	db.Cart.destroy({
        where: {
            user_id: req.user.id
        }
    })
    .then(function(cart) {
    	console.log('yay');
    });
}




module.exports = router;