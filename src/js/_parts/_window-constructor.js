$(function(){

	var laminationSwiper = new Swiper('.js-laminationSwiper .swiper-container', {
	    speed: 300,
	    slidesPerView: 'auto',
        nextButton: '.js-laminationSwiper .arrow-next',
	    prevButton: '.js-laminationSwiper .arrow-prev',
	    pagination: '.js-laminationSwiper .swiper-pagination',
	    paginationClickable: true,
	    breakpoints: {
	    	768: {
	    		slidesPerColumn: $('.js-laminationSwiper .swiper-slide').length <= 4 ? 1 : 2,
	    		slidesPerView: 4
	    	}
	    }
	});

	if($(window).width() <= 767){
		if($('.js-laminationSwiper .swiper-slide').length <= 8){
			$('.js-laminationSwiper .swiper-pagination').hide();
		}
		if($('.js-colorSwiper .swiper-slide').length <= 3){
			$('.js-colorSwiper .swiper-pagination').hide();
		}
	}

	if($(window).width() >= 768){
		if($('.js-laminationSwiper .swiper-slide').length <= 9){
			$('.js-laminationSwiper').addClass('swiper-padding-reset');
			$('.js-laminationSwiper .swiper-pagination, .js-laminationSwiper .arrow-prev, .js-laminationSwiper .arrow-next').hide();
		}
		if($('.js-colorSwiper .swiper-slide').length <= 5){
			$('.js-colorSwiper').addClass('swiper-padding-reset');
			$('.js-colorSwiper .swiper-pagination, .js-colorSwiper .arrow-prev, .js-colorSwiper .arrow-next').hide();
		}
	}

	var colorSwiper = new Swiper('.js-colorSwiper .swiper-container', {
	    speed: 300,
	    slidesPerView: 5,
	    spaceBetween: 0,
        nextButton: '.js-colorSwiper .arrow-next',
	    prevButton: '.js-colorSwiper .arrow-prev',
	    pagination: '.js-colorSwiper .swiper-pagination',
	    paginationClickable: true,
	    breakpoints: {
	    	768: {
	    		spaceBetween: 15,
	    		slidesPerView: 3
	    	}
	    }
	});


	var windowConstructorBox = $('.window-constructor__box'),
		windowConstructorElem = $('.window-constructor__elem');

	$(document).on('click', '.js-constructorModalLink', function(){
		var modal = $(this).data('constructor-modal'),
			modalHeadTitle = $('.js-constructorModalTitle');

		windowConstructorBox.addClass('is-open');
		windowConstructorElem.hide();
		modalHeadTitle.text($(this).text());
		$('' + modal + '').show();

		laminationSwiper.update(true);
		colorSwiper.update(true);
	});

	$(document).on('click', '.js-constructorModalClose', function(){
		windowConstructorBox.removeClass('is-open');
	});


	$(document).on('click', '.constructor-elem', function(){
		$(this).parents('.window-constructor__swiper').find('.constructor-elem').removeClass('is-active');
		$(this).addClass('is-active');
	});
});
