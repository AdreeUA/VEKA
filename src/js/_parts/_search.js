/*
 * Search
 */

$(function(){
	$(document).on('click', '.js-searchControl', function(){
		$('.header__search').addClass('is-open');
	});

	$(document).on('click', '.js-searchClose', function(){
		$('.header__search').removeClass('is-open');
	});
});