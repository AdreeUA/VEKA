$(document).on('click', '.js-toggleLink', function(){
	var el = $(this).parent();

	if(el.hasClass('is-open')){
		el.removeClass('is-open');
	}
	else {
		el.addClass('is-open').siblings().removeClass('is-open');
	}
});