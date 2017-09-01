$(document).ready(function(){
	var service = 'http://assignment.siteimprove.com/api/';
	var loader = '<div id="loader" class="loader">Loading...</div>';
	var interval = null;
	
	$.ajaxSetup({
    		cache: false
	});
	
	$('#container').hide();
	
	$('#wrapper').append(loader);
	$('#loader').delay(3000).show();
	interval = setInterval(loadTable,3000);

	function loadTable() {
		
		$.ajax(
		{
			type: "GET",
			url: service + 'persons',
			data: "{}",
			contentType: "application/json; charset=utf-8",
			dataType: "json",
			cache: false,
			success: function (data) {
				
				var	trHTML = '';
						
				$.each(data, function (i, item) {
					trHTML += '<tr><td>' + data[i].Name + '</td><td>' + data[i].YearOfBirth + '</td><td>' + data[i].NumChildren + '<i class="glyphicon glyphicon-plus"></i></td><td class="profession">' + data[i].Profession + '</td></tr>';
				});
				
				$('#brains').append(trHTML);
				$('#container').show();
				$('#loader').hide();
				clearInterval(interval);
			},
			
			error: function (msg) {
				alert(msg.responseText);
			}
		});
	};
})
