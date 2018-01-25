///////////////////////////
//ADD CLICK COUNT TO PAGE// DONE
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
   //console.log("products on page!" , products);
  
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
//TOTAL USER COUNT// DONE
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
//TOTAL CLIENT COUNT// DONE
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
//SALES TOTAL// DONE +
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
  ///console.log(salesIncrement);
  formatSales = "$"+salesIncrement;
  ///console.log(formatSales);
  addSalestoPage();
};

function addSalestoPage(){
  // console.log("now scope is correct",totalClients)
  var salesTotal = document.querySelectorAll('#BAsales')
  // console.log(clientTotal)
  salesTotal.forEach((salesTotal)=> {
    salesTotal.innerHTML = formatSales;
    createSalesChart();
  })
};

////////////////////////
//SALES TIMELINE CHART//
////////////////////////
$(window).resize(function() {
  if(this.resizeTO) clearTimeout(this.resizeTO);
  this.resizeTO = setTimeout(function() {
      $(this).trigger('resizeEnd');
  });
});
$(window).on('resizeEnd', function() {
  createSalesChart();
  drawProductBAR();
  drawUserBAR();
  drawOrderBAR();
});

function createSalesChart(){

  google.charts.load('current', {'packages':['corechart']});
  google.charts.setOnLoadCallback(drawChart);
  
  function drawChart() {
    dateCapture=[];
    chartArray= [['Date','Sales']];
    // console.log("check scope",totalClients);

    //create x axis//
    for (i=0; i<totalClients.length; i++){
      // console.log(totalClients[i].create_date.toString());
      newdate = totalClients[i].createdAt.toString();
      // console.log(newdate.substring(0,10));
      if (dateCapture.indexOf(newdate.substring(0,10))<0){
        dateCapture.push(newdate.substring(0,10));
      }
    }
      // console.log(dateCapture);

    //start building dataSalesChart array
    basicArray= [['Date','Sales']];
    for (i=0;i<dateCapture.length;i++){
      basicArray.push([dateCapture[i],0]);
    }
    // console.log(basicArray);

    //add sales into array for each day
    count=0;
    for (i=1;i<basicArray.length;i++){
      dateBin =basicArray[i][0];
      
      calculateSales();
    }
    
     
    
    function calculateSales(){
      for (l=0; l<totalClients.length; l++){
        newdate = totalClients[l].createdAt.toString();
        console.log(dateBin);
        console.log("newdate",newdate.substring(0,10));
        
        if (basicArray[i][0]===newdate.substring(0,10)){
          // console.log("chartarray",chartArray[i][0]);
          basicArray[i][1]=basicArray[i][1]+(totalClients[l].price*totalClients[l].qty);
        }else{
          // console.log("chartarray",chartArray[i][0]);
        }
      }
    }

//     ///console.log(chartArray);

var dataSalesChart= basicArray;
    // var dataSalesChart= [
    //   ['Date', 'Clicks'],
    //   ['0',  0],
    //   ['2002',  1170],
    //   ['2003',  610],
    //   ['2004',  1260],
    //   ['2005',  1560],
    //   ['2006',  560],
    //   ['2007',  260],
    //   ['2008',  1030]
    // ];
    var data = google.visualization.arrayToDataTable(dataSalesChart);

    var options = {
      
      legend:{position:'none'},
      hAxis: {
        baselineColor: 'transparent',
        // textStyle: {color: 'transparent'}
      },
      vAxis: {
        // textStyle: {color: 'transparent'},
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
    var salesTimeline = document.querySelectorAll('.sales_chart');
    // console.log(products);

    salesTimeline.forEach((saleschart)=> {
      var chart = new google.visualization.AreaChart(saleschart);
      chart.draw(data, options);
      drawProductBAR();
      drawUserBAR();
      drawOrderBAR();
    });
  }
}

//////////////////////
//TOP PRODUCTS CHART//
//////////////////////
google.charts.load('current', {packages: ['corechart', 'bar']});
google.charts.setOnLoadCallback(drawProductBAR);

function drawProductBAR() {
// console.log(totalClients);
var ordersArray=[];

//create x axis//
for (i=0; i<totalClients.length; i++){
  // console.log(totalClients[i].create_date.toString());
  newProduct = totalClients[i].short_desc.toString();
  // console.log(newdate.substring(0,10));
  if (ordersArray.indexOf(newProduct)<0){
    ordersArray.push(newProduct);
  }
}
// console.log(ordersArray);

//start building dataSalesChart array
prodChartArray= [];
for (i=0;i<ordersArray.length;i++){
  prodChartArray.push([ordersArray[i],0,'stroke-color: #818B75; stroke-width: 2;fill-color: #bed287; color: #818B75']);
}
// console.log(prodChartArray);

//add sales into array for each day
count=0;
for (i=1;i<prodChartArray.length;i++){
  distinctItem =prodChartArray[i][0];
  calculateProdSales();
}

function calculateProdSales(){
  for (l=0; l<totalClients.length; l++){
    distinctItem = totalClients[l].short_desc.toString();
    if (prodChartArray[i][0]===distinctItem){
      prodChartArray[i][1]=prodChartArray[i][1]+(totalClients[l].price*totalClients[l].qty);
    }
  }
}
//console.log(prodChartArray);

//order array

prodChartArray.sort(function(a,b){
  return b[1]-a[1];
});
///console.log(prodChartArray);
 
//grab top 10
topProductsArray =[];
for (i=0;i<10;i++){
  topProductsArray.push(prodChartArray[i]);
}
///console.log(topProductsArray);
//add header
var header = ['User', 'Sales',{role: 'style'}];
topProductsArray.unshift(header);

var data= google.visualization.arrayToDataTable(topProductsArray);

  var options = {
    legend:{position:'none'},
    height: 600,
    chartArea: {width: '50%'},
    hAxis: {
      baselineColor: 'transparent',
      minValue: 0
    },
    vAxis: {
    }
  };

  var chart = new google.visualization.BarChart(document.getElementById('prod_div'));

  chart.draw(data, options);
    }

///////////////////
//TOP Users CHART//
///////////////////
google.charts.load('current', {packages: ['corechart', 'bar']});
google.charts.setOnLoadCallback(drawProductBAR);

function drawUserBAR() {
// console.log(totalClients);
var topUArray=[];

//create x axis//
for (i=0; i<totalClients.length; i++){
  distUser = totalClients[i].user_id.toString();
  // console.log(newdate.substring(0,10));
  if (topUArray.indexOf(distUser)<0){
    topUArray.push(distUser);
  }
}
//  console.log(topUArray);

//start building dataSalesChart array
userChartArray= [];
for (i=0;i<topUArray.length;i++){
  userChartArray.push([topUArray[i],0,'stroke-color: #818B75; stroke-width: 2;fill-color: #bed287; color: #818B75']);
}
//  console.log(userChartArray);

//add sales into array for each day
count=0;
for (i=1;i<userChartArray.length;i++){
  distinctItem =userChartArray[i][0];
  calculateUserSales();
}

function calculateUserSales(){
  for (l=0; l<totalClients.length; l++){
    distinctItem = totalClients[l].user_id.toString();
    if (userChartArray[i][0]===distinctItem){
      userChartArray[i][1]=userChartArray[i][1]+(totalClients[l].price*totalClients[l].qty);
    }
  }
}
//  console.log(userChartArray);

//order array

userChartArray.sort(function(a,b){
  return b[1]-a[1];
});
//  console.log(userChartArray);
 
//grab top 10
topUsersArray =[];
for (i=0;i<15;i++){
  topUsersArray.push(userChartArray[i]);
}
//  console.log(topUsersArray);
//add header
var header = ['User', 'Sales',{role: 'style'}];
var finalUserArray=[];
topUsersArray.unshift(header);
for (i=0;i<9;i++){
  finalUserArray.push(topUsersArray[i]);
}

// console.log(finalUserArray);


var data= google.visualization.arrayToDataTable(finalUserArray);

  var options = {
    legend:{position:'none'},
    height: 600,
    chartArea: {width: '50%'},
    hAxis: {
      baselineColor: 'transparent',
      minValue: 0
    },
    vAxis: {
    }
  };

  var chart = new google.visualization.BarChart(document.getElementById('user_div'));

  chart.draw(data, options);
    }


///////////////////
//TOP Orders CHART//
///////////////////
google.charts.load('current', {packages: ['corechart', 'bar']});
google.charts.setOnLoadCallback(drawProductBAR);

function drawOrderBAR() {
// console.log(totalClients);
var topOArray=[];

//create x axis//
for (i=0; i<totalClients.length; i++){
  distOrder = totalClients[i].id.toString();
  // console.log(newdate.substring(0,10));
  if (topOArray.indexOf(distOrder)<0){
    topOArray.push(distOrder);
  }
}
//  console.log(topOArray);

//start building dataSalesChart array
orderChartArray= [];
for (i=0;i<topOArray.length;i++){
  orderChartArray.push([topOArray[i],0,'stroke-color: #818B75; stroke-width: 2;fill-color: #bed287; color: #818B75']);
}
//  console.log(orderChartArray);

//add sales into array for each day
count=0;
for (i=1;i<orderChartArray.length;i++){
  distinctItem =orderChartArray[i][0];
  calculateOrderSales();
}

function calculateOrderSales(){
  for (l=0; l<totalClients.length; l++){
    distinctItem = totalClients[l].id.toString();
    if (orderChartArray[i][0]===distinctItem){
      orderChartArray[i][1]=orderChartArray[i][1]+(totalClients[l].price*totalClients[l].qty);
    }
  }
}
//  console.log(orderChartArray);

//order array

orderChartArray.sort(function(a,b){
  return b[1]-a[1];
});
//  console.log(orderChartArray);
 
//grab top 10
topOrdersArray =[];
for (i=0;i<15;i++){
  topOrdersArray.push(orderChartArray[i]);
}
//  console.log(topOrdersArray);
//add header
var header = ['User', 'Sales',{role: 'style'}];
var finalOrderArray=[];
topOrdersArray.unshift(header);
for (i=0;i<11;i++){
  finalOrderArray.push(topOrdersArray[i]);
}

// console.log(finalOrderArray);


var data= google.visualization.arrayToDataTable(finalOrderArray);

  var options = {
    legend:{position:'none'},
    height: 600,
    chartArea: {width: '50%'},
    hAxis: {
      baselineColor: 'transparent',
      minValue: 0
    },
    vAxis: {
    }
  };

  var chart = new google.visualization.BarChart(document.getElementById('order_div'));

  chart.draw(data, options);
    }



///////////////////////////////////////
//ADD CHART TO ANALYTICS/PRODUCT PAGE// NOT DONE
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