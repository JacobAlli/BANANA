///////////////////////////
//ADD CLICK COUNT TO PAGE//
///////////////////////////
getClicks();
var allClicks;
function getClicks(){
  // Send the PUT request.
  $.ajax("/api/clicks", {
    type: "GET"
  }).then(
    function(data) {
      allClicks= data.clicks;
      findProductsOnPage();
    }
  );
};

function findProductsOnPage(){
  var products = document.querySelectorAll('.clicksArea');
  // console.log(allClicks);
   console.log("gotem" , products);
  
  products.forEach((product)=> {
    var prodID= parseInt(product.attributes.prodid.nodeValue);
    console.log("Start new product ID:",prodID);
    
    var count = 0;
    console.log("reset count to",count);
    console.log("start running through click table", allClicks.length);
    for (i=0; i<allClicks.length;i++){  
      clickprodid= parseInt(allClicks[i].product_id);
      if (prodID===clickprodid){
        console.log("compare ",prodID,clickprodid);
        count=allClicks[i].clickCount;
        console.log("increased count to: ",count);
      }
    }
    product.attributes.clickcount.nodeValue=count;
    product.innerHTML = "<h5>exposure: "+count+"</h5>";
   
    // console.log("Product count =",product.attributes.clickcount.nodeValue)
    });
  };
/////////////////////////////
//TOTALS FOR ANALYTICS PAGE//
/////////////////////////////

////////////////////
//TOTAL USER COUNT//
////////////////////
getUserTotal();
var allUsers;
function getUserTotal(){
  // Send the PUT request.
  $.ajax("/api/users", {
    type: "GET"
  }).then(
    function(data) {
      allUsers= data;
      sumUsers();
    }
  );
};

function sumUsers(){
  // console.log("now scope is correct",allUsers.length)
  var userTotal = document.querySelectorAll('#BAusers')
  // console.log(userTotal)
  userTotal.forEach((userTotal)=> {
    userTotal.innerHTML = allUsers.length ;
  })
};

//////////////////////
//TOTAL CLIENT COUNT//
//////////////////////
getClientCount();
var totalClients;
function getClientCount(){
  // Send the PUT request.
  $.ajax("/api/orders", {
    type: "GET"
  }).then(
    function(data) {
      totalClients= data;
      orderCount();
    }
  );
};

function orderCount(){
  // console.log("now scope is correct",totalClients)
  var clientTotal = document.querySelectorAll('#BAclients')
  // console.log(clientTotal)
  clientTotal.forEach((clientTotal)=> {
    clientTotal.innerHTML = totalClients.length;
    salesTotal();
  })
};

///////////////
//SALES TOTAL//
///////////////
var salesIncrement=0;
var formatSales;
function salesTotal(){
  // console.log('in scope',totalClients);
  totalClients.forEach((order)=> {
    // console.log("item price: ",parseInt(order.price));
    var price= parseInt(order.price);
    var qty = order.qty;
    var sum = price * qty;
    // console.log(price);
    // console.log(qty);
    // console.log(price * qty);
    // console.log("summed ", sum);
    salesIncrement=salesIncrement+sum;
  });
  console.log(salesIncrement);
  formatSales = "$"+salesIncrement;
  console.log(formatSales);
  addSalestoPage();
};

function addSalestoPage(){
  // console.log("now scope is correct",totalClients)
  var salesTotal = document.querySelectorAll('#BAsales')
  // console.log(clientTotal)
  salesTotal.forEach((salesTotal)=> {
    salesTotal.innerHTML = formatSales;
  })
};

///////////////////////////////////////
//ADD CHART TO ANALYTICS/PRODUCT PAGE//
///////////////////////////////////////
google.charts.load('current', {'packages':['corechart']});
      google.charts.setOnLoadCallback(drawChart);


      function drawChart() {
        var data = google.visualization.arrayToDataTable([
          ['Year', 'Clicks'],
          ['0',  0],
          ['2002',  1170],
          ['2003',  610],
          ['2004',  1260],
          ['2005',  1560],
          ['2006',  560],
          ['2007',  260],
          ['2008',  1030]
        ]);

        var options = {
          legend:{position:'none'},
          hAxis: {
            baselineColor: 'transparent',
            textStyle: {color: 'transparent'}
          },
          vAxis: {
            textStyle: {color: 'transparent'},
            baselineColor: 'transparent',
            minValue: 0,
            gridlines: {
              color: 'transparent'
            }
          },
          lineWidth: 2,
          series: {
            0: {color:'#ADB227'}
          }
        };
        var products = document.querySelectorAll('.chart_div');
        // console.log(products);

        products.forEach((product)=> {
          var chart = new google.visualization.AreaChart(product);
          chart.draw(data, options);
        });

      }