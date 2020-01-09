var labels = [];
var points = [];
var dataset = "Data set of Bitcoin";
var ctx = document.getElementById('myChart').getContext('2d');
var chart = new Chart(ctx, {
    // The type of chart we want to create
    type: 'line',

    // The data for our dataset
    data: {
        labels: ["1","2","3","4"],
        datasets: [{
            label: 'Data set for the selected period',
            backgroundColor: 'rgb(56, 99, 132)',
            borderColor: 'rgb(0, 216, 0)',
            data: [1,2,3,4],
        }
        ]
    }    
});

function getRate() {
	let out = document.getElementById('out');
	$.get(
		"https://api.coindesk.com/v1/bpi/currentprice.json",
		function(data) {
			data = JSON.parse(data);
			for (var key in data.bpi){
				out.innerHTML += parseFloat(data.bpi[key].rate_float).toFixed(2) + ' ' + data.bpi[key].symbol + '<br>' ;
			}
		}
	);	
}


function getHistoryRate() {
	labels = [];
	points = [];
	$.get(
		"https://api.coindesk.com/v1/bpi/historical/close.json",
		{
			"start" : $('#date1').val(),
			"end" : $('#date2').val()
		},
		function(data) {
			data = JSON.parse(data);
			for (var key in data.bpi) {
				labels.push([key]);
				points.push(parseInt(data.bpi[key]));
			}
		}
	);
};

$(document).ready(function() {
	getRate();
	$('#show').on('click', function() {
		var waitforme = getHistoryRate();
		var promisme = $.when(waitforme);

		promisme.done(function() {
			setTimeout(function() {				
				chart.data.labels = labels;
				chart.data.datasets[0].data = points;
				chart.data.datasets[0].label = dataset;
				chart.update();	
			}, 500);
			
		});
		console.log(chart.data.datasets[0].data);
		console.log(chart.data.labels);
	});

	// $('input[type="date"]').on('input', getHistoryRate);
});



// function updateChart () {
// 	chart.data.labels = 
// }

// var myBarChart = new Chart(ctx, {
//     type: 'bar',
//     data: [20, 10],
//     // options: options
// });
