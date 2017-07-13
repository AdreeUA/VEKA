/*
 * Выбор города
 */

$(function(){
	$(document).on('click', '.js-citySelectLink', function(){
		$('body').addClass('is-city-select');
	});

	$(document).on('click', '.js-closeCitySelect', function(){
		$('body').removeClass('is-city-select');
	});
});