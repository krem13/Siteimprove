$(document).ready(function(){
	var service = 'http://assignment.siteimprove.com/api/';
	var delay = 3000;
	setTimeout( loadTable, delay );
	
	function loadTable() {
		//setTimeout( "('#loader').hide();", delay );
		$.ajax(
		{
			type: "GET",
			url: service + 'persons',
			data: "{}",
			contentType: "application/json; charset=utf-8",
			dataType: "json",
			cache: false,
			success: function (data) {
				
			var trHTML = '';
					
			$.each(data, function (i, item) {
				//console.log(data[Name]);
				//console.log(data[i].Name);
				trHTML += '<tr><td>' + data[i].Name + '</td><td>' + data[i].YearOfBirth + '</td><td>' + data[i].NumChildren + '</td><td class="profession">' + data[i].Profession + '</td></tr>';
			});
			
			$('#brains').append(trHTML);
			
			},
			
			error: function (msg) {
				alert(msg.responseText);
			}
		});
	}
})
