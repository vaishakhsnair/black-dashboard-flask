function getVoltField(){
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (xhr.readyState == XMLHttpRequest.DONE) {
            console.log( JSON.parse(xhr.responseText))
        }
    }
    xhr.open('GET', '/api/voltage', true);
    xhr.send(null);
}

function getPercentField(){
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (xhr.readyState == XMLHttpRequest.DONE) {
            var data = JSON.parse(xhr.responseText).feeds
            console.log(data )
            var timeline = []
            var values = []
            data.forEach(element => {
                var time = element.created_at
                time  = time.split("T")[1].slice(0,-1)
                var value = element.field2

                timeline.push(time)
                values.push(value)


                
            });
            fillchart(values,timeline)
        }
    }
    xhr.open('GET', '/api/charge', true);
    xhr.send(null);
}


function fillchart(chart_data,chart_labels){

  


    var ctx = document.getElementById("chartBig1").getContext('2d');

    var gradientStroke = ctx.createLinearGradient(0, 230, 0, 50);

    gradientStroke.addColorStop(1, 'rgba(72,72,176,0.1)');
    gradientStroke.addColorStop(0.4, 'rgba(72,72,176,0.0)');
    gradientStroke.addColorStop(0, 'rgba(119,52,169,0)'); //purple colors
    var config = {
      type: 'line',
      data: {
        labels: chart_labels,
        datasets: [{
          label: "Charge Data",
          fill: true,
          backgroundColor: gradientStroke,
          borderColor: '#d346b1',
          borderWidth: 2,
          borderDash: [],
          borderDashOffset: 0.0,
          pointBackgroundColor: '#d346b1',
          pointBorderColor: 'rgba(255,255,255,0)',
          pointHoverBackgroundColor: '#d346b1',
          pointBorderWidth: 20,
          pointHoverRadius: 4,
          pointHoverBorderWidth: 15,
          pointRadius: 4,
          data: chart_data,
        }]
      },
      options: gradientChartOptionsConfigurationWithTooltipPurple
    };
    var myChartData = new Chart(ctx, config);

    


}

getPercentField()