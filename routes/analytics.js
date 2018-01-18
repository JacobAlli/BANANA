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
});
module.exports = router;
