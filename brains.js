$(document).ready(function(){
	jQuery.support.cors = true;
	
	var service = 'https://assignment.siteimprove.com/api/',
		loader = '',
		interval = null;
	
	if (document.all && !window.atob) {
		loader = '<div id="loader" class="ie9-only">Loading...</div>';
	} else {
		loader = '<div id="loader" class="loader">Loading...</div>';
	}
	
	$('#container').hide();	
	$('#wrapper').append(loader);
	$('#loader').delay(3000).show();
	interval = setInterval(loadTable,3000);
	
	function loadTable() {
		var	trHTML = '';
		var kidsthHTML = '';
		
		$.getJSON(service + 'persons').done(function (data) {
			
			$.each(data, function (i, item) {
				
				var cbID = 'post' + i,
					targetID = 'target' + i,
					readMore = '<input type="checkbox" class="read-more-state" id="' + cbID + '" /><label for="' + cbID + '" class="read-more-trigger"></label>';
				
				if (data[i].NumChildren && data[i].NumChildren > 0) {
					var	kidstrHTML = '';
					var kidsID = 'kids' + data[i].Id;
					var kidsTable = '<table id="' + kidsID + '" class="table"><tr><th>Name</th><th>Year of Birth</th><th>Mother</th></tr></table>';
					
					trHTML += '<tr><td>' + data[i].Name + '</td><td>' + data[i].YearOfBirth + '</td><td class="children">' + data[i].NumChildren + readMore + '</td><td class="profession">' + data[i].Profession + '</td></tr>';
					
					$.getJSON(service + 'persondetails/' + data[i].Id, function (kidsdata) {
						$.each(kidsdata, function (i, item) {
							kidstrHTML += '<tr><td>' + kidsdata[i].Name + '</td><td>' + kidsdata[i].YearOfBirth + '</td><td>' + kidsdata[i].Mother + '</td></tr>';
						});
						
						$("#" + kidsID).append(kidstrHTML);
					});
					
					trHTML += '<tr id="' + targetID + '" class="read-more-target"><td colspan="4">' + kidsTable + '</td></tr>';
				} else {
					trHTML += '<tr><td>' + data[i].Name + '</td><td>' + data[i].YearOfBirth + '</td><td class="children">' + data[i].NumChildren + '</td><td class="profession">' + data[i].Profession + '</td></tr>';
				}
				
			});
		
			$('#brains').append(trHTML);
			$('#container').show();
			$('#loader').hide();
			clearInterval(interval);
		
			$('#brains td').each(function() {
				
				var tdclass = $(this).attr('class'),
					checkbox = $(this).find('input:checkbox:first'),
					cbclass = checkbox.attr('class'),
					target = $(this).parent().next();
					
				if (tdclass === 'children' && cbclass === 'read-more-state') {
					checkbox.click(function() {
						if (checkbox.is(":checked")) {
							target.addClass('visible');
							$(this).parent().addClass('grey');
						} else {
							target.removeClass('visible');
							$(this).parent().removeClass('grey');
						}
					
					})
				}
			});
		});
	}
})
