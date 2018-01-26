 $(document).ready(function () {
// var express = require("express");
// var db = require("../models");
$(document).on("click", "#checkout-btn", deleteItem);
$(document).on("click", "#continue-btn", continueShopping);

var itemInCart = [];

function getItems(){
$.get("api/orders", function(data){
    items = data;
});
}
function continueShopping(event) {
    window.location = "http://localhost:3000/products";
}
function deleteItem(event){
        // Send the PUT request.
        var userid;
        $.ajax("/api/clicks", {
            type: "get"
        }).then(
            function (data) {
                userid=data.user.id;
                console.log('userid is right',userid);
                deletingUser();
            }
            );
            function deletingUser() {
                
            
        $.ajax({
            method: "DELETE",
            url: "/api/orders/" + userid
        })
            .done(function () {
                console.log("Deleting user id" + userid);
            });
        }


    // db.Cart.destroy({
    //     where: {
    //         user_id: 1
    //     }
    // });
    //.data("user_id");
    // $.ajax({
    //     method: "DELETE",
    //     url: "/api/orders" + userid
    // }).done(getItems);
}
});