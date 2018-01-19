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
        console.log(products);

        products.forEach((product)=> {
          var chart = new google.visualization.AreaChart(product);
          chart.draw(data, options);
        });

      }