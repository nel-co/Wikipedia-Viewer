function getResults() {

	var input = document.getElementById('userInput').value;

	$.ajax({
		url: 'https://en.wikipedia.org/w/api.php',
		data: {
			action: 'opensearch',
			format: 'json',
			namespace: '0',
			limit: '6',
			search: input
		},
		type: 'GET',
		dataType: 'jsonp',
		success: function (data) {

			var header = data[1];
			var brief = data[2];
			var link = data[3];
			for (var i = 0; i < header.length; i++) {
				$('.resultContainer').append('<a href="' + link[i] +
								'" class="result" target="_blank><h1 class="aTitle">' + header[i] +
								'</h1><p class="aBrief">' + brief[i] + '</p></a>');
			}
		}
	});
}

$(document).ready(function () {
	
	$('.logo').hide();
	
	$('#userInput').focus(function() {
		if($('.logo').hide()) {
			 $('.logo').show();
		}
	});
		
	/* Begin Search on Enter */
	$('#userInput').keypress(function (e) {
  	if (e.which == 13) {
			$('.resultContainer').empty();
			NProgress.start();
			NProgress.done();
			getResults();
			return false;
  	}
	});	
	/* End Search on Enter */
	
	
	/* Begin Hide Results if empty */
	
	$('#userInput').keyup(function () {
		if ($(this).val().length == 0) {
			NProgress.start();
			NProgress.done();
			$('.resultContainer').empty();
		} else {
			$('.resultContainer').show();
		}
	});
	
	/* End Hide Results if empty */

});