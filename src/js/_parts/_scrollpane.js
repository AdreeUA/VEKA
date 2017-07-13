// Scrollpane

if($(window).width() >= 768){
	if($('body').find('.js-scroll').length) {
		var scrollpane = $('.js-scroll').jScrollPane({
			autoReinitialise: true
		});

		var apiScrollpane = scrollpane.data('jsp');
	}
}
