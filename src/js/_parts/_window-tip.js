$(function(){

	$(document).on('click', '.js-windowToggleLink', function(){
		if($(this).hasClass('is-open')){
			$(this).removeClass('is-open');
		}
		else {
			$('.js-windowToggleLink').removeClass('is-open');
			$(this).addClass('is-open');
		}
	});

	$(document).on('click', '.js-windowToogleClose', function(){
		$('.js-windowToggleLink').removeClass('is-open');
	});

});