var Nightmare = require("nightmare");

//var expect = require("chai").expect;
var nightmare = Nightmare ({show: true});

/*describe("BananaShop", function(){
	this.timeout(30000);
	it("should take us to the login page", function(done){
		var nightmare = Nightmare ()
		nightmare//({ show: true})
		.goto("localhost:3000/login")
		.type('#login-username', "Jacobali")
		.type("#login-password", "yayayayaya")
		.click("#form-btn")
	} ).then(function(login){
		expect(login).to.equal("/");
		done();
	});
});
*/
nightmare
	.goto("http://localhost:3000/login")
	.type("#login-username", "Jacobali")
	.type("#login-password", "yayayayaya")
	.click("#form-btn")
	.wait()
	.end()
	.then(function(result){
		console.log(result, "logged in")
	})
	.catch(function(error){
		console.log(error)
	})
	