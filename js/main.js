$(document).ready(function() {
	getRate();
	// getHistoryRate();
	$('input[type="date"]').on('input', getHistoryRate);
});

function getRate() {
	let out = document.getElementById('out');
	$.get(
		"https://api.coindesk.com/v1/bpi/currentprice.json",
		function(data) {
			data = JSON.parse(data);
			console.log(data);
			for (var key in data.bpi){
				out.innerHTML += parseFloat(data.bpi[key].rate_float).toFixed(2) + ' ' + data.bpi[key].symbol + '<br>' ;
			}
		}
	);	
}



function getHistoryRate() {
	// https://api.coindesk.com/v1/bpi/historical/close.json
	$.get(
		"https://api.coindesk.com/v1/bpi/historical/close.json",
		{
			"start" : $('#date1').val(),
			"end" : $('#date2').val()
		},
		function(data) {
			data = JSON.parse(data);
			console.log(data);
		}
	);
}

