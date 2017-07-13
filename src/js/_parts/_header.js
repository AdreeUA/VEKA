/*
 * Header
 */

$(function(){

	// Header submenu overlay

	$(window).on('load resize', function(){
		if($(window).width() >= 768){
			$('.header__top, .header__bottom').removeAttr('style');

			$('.nav-main__overlay').css({
				'width': $(window).width(),
				'left': -($('.header__bottom .container').offset().left + 15)
			});
		}

		if($(window).width() <= 767){
			var screenHeight = window.screen.height;

			$('.header__top, .header__bottom').css({'height': screenHeight});
		}
	});


	// Header burger toggle

	var body = $('body'),
		backLinkLabel = $('.header__back-label');

	$(document).on('click', '.js-burger', function(){
		$(this).toggleClass('is-active');
		
		if(body.hasClass('is-first-level') || body.hasClass('is-second-level') || body.hasClass('is-third-level')){
			body.removeClass('is-first-level is-second-level is-third-level');
			backLinkLabel.text(backLinkLabel.data('label'));

			$('.nav-main__item').removeClass('is-active').siblings().show();
		}
		else {
			body.addClass('is-first-level');
		}
	});



	/*
	 * Top navigation
	 */

	$(document).on('click', '.top-nav__link', function(event){
		event.preventDefault();

		var _this = $(this),
			link = _this.attr('href');

		_this.parent().addClass('is-active').siblings().removeClass('is-active');
		$('' + link + '').addClass('is-active').siblings().removeClass('is-active');

		if($(window).width() <= 767){
			body
				.removeClass('is-first-level')
				.addClass('is-second-level');
		}
	});


	/*
	 * Bottom navigation
	 */

	if($(window).width() <= 767){
		$(document).on('click', '.nav-main__toggle', function(){
			var _this = $(this).parent();
			
			if(_this.parent().find('.nav-main__submenu').length){
				body.removeClass('is-second-level')
					.addClass('is-third-level');

				backLinkLabel.text($('.top-nav__item.is-active .top-nav__link').text());

				_this.parent().addClass('is-active').siblings().hide();
				return false;
			}
		});
	} 


	/*
	 * Header navigation back link
	 */

	$(document).on('click', '.js-headerBackLink', function(){
		if(body.hasClass('is-second-level')){
			body
				.removeClass('is-second-level')
				.addClass('is-first-level');
		}

		if(body.hasClass('is-third-level')){
			body
				.removeClass('is-first-level is-third-level')
				.addClass('is-second-level');

			backLinkLabel.text(backLinkLabel.data('label'));
			$('.nav-main__item').removeClass('is-active').siblings().show();
		}
	});


	/*
	 * Header sticky
	 */

	$(window).on('load scroll resize', function(){
		var scrolled = $(window).scrollTop(),
			header = $('.header');

		if(scrolled >= 400){
			body.addClass('header-is-sticky');
			header.addClass('is-sticky');

			setTimeout(function(){
				header.addClass('is-show');
			}, 300);
		}
		if(scrolled <= 399){
			body.removeClass('header-is-sticky');
			header.removeClass('is-sticky is-show');
			// header.removeClass('is-show');

			// if(!header.hasClass('is-show')){
			// 	setTimeout(function(){
			// 		header.removeClass('is-sticky');
			// 	}, 400);
			// }
		}
	});
});