/*
 * Footer
 */

$(function(){
	if($(window).width() <= 767){
		$(document).on('click', '.footer-nav__label', function(){
			var _this = $(this),
				menu = _this.parent().find('.footer-nav__list');

			if(menu.css('display') == 'none'){
				_this.addClass('is-active');
				menu.slideDown(200);
			}
			else {
				_this.removeClass('is-active');
				menu.slideUp(200);
			}

			return false;
		});
	}
});