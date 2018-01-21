//ADD CLICK COUNT TO PAGE//
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


//ADD CHART TO PAGE//
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