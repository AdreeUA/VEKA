
// Main slider

var mainSwiper = new Swiper('.js-mainSwiper .swiper-container', {
    speed: $('.js-mainSwiper').data('speed'),
    // autoplay: $('.js-mainSwiper').data('autoplay') || 4000,
    autoplayDisableOnInteraction: false,
    autoplayStopOnLast: false,
    loop: true,
    nextButton: '.js-mainSwiper .swiper-button-next',
    prevButton: '.js-mainSwiper .swiper-button-prev',
    pagination: '.js-mainSwiper .swiper-pagination',
    paginationClickable: true,
    breakpoints: {
        // when window width is <= 767px
        767: {
            autoHeight: true
        }
    }
});


// Promo slider

var promoSwiper = new Swiper('.js-promoSwiper .swiper-container', {
    speed: 300,
    autoplay: 4000,
    autoHeight: true,
    effect: $('.js-promoSwiper').data('effect') ? $('.js-promoSwiper').data('effect') : 'fade',
    pagination: '.js-promoSwiper .swiper-pagination',
    nextButton: '.js-promoSwiper .huge-arrow__right',
    prevButton: '.js-promoSwiper .huge-arrow__left',
    paginationClickable: true
});

$(document)
    .on('focus', '.js-promoSwiper', function(){
        promoSwiper.stopAutoplay();
    })
    .on('blur', '.js-promoSwiper', function(){
        promoSwiper.startAutoplay();
    })
    .on('promoSwiperUpdate', function(){
        promoSwiper.update(true);
    });


// Solutions slider

var solutionsSwiper = new Swiper('.js-solutionsSwiper .swiper-container', {
	slidesPerView: 3,
    slidesPerColumn: ($('.js-solutionsSwiper').data('multirow') == false) ? 1 : 2,
    spaceBetween: 25,
    simulateTouch: false,
    nextButton: '.js-solutionsSwiper .huge-arrow__right',
    prevButton: '.js-solutionsSwiper .huge-arrow__left',
    breakpoints: {
        768: {
			slidesPerView: 1,
			slidesPerColumn: 1,
			autoHeight: true
        }
    }
});


// Review slider

var reviewSwiper = new Swiper('.js-reviewSwiper .swiper-container', {
    speed: 600,
    slidesPerView: 3,
    spaceBetween: 25,
    simulateTouch: false,
    nextButton: '.js-reviewSwiper .huge-arrow__right',
    prevButton: '.js-reviewSwiper .huge-arrow__left',
    breakpoints: {
        768: {
        	speed: 300,
			slidesPerView: 1,
			spaceBetween: 0,
			autoHeight: true
        }
    }
});


// Partner slider

var partnerSwiper = new Swiper('.js-partnerSwiper .swiper-container', {
    speed: 600,
    autoplay: $('.js-partnerSwiper').data('autoplay') || 4000,
    slidesPerView: 4,
    spaceBetween: 25,
    pagination: '.js-partnerSwiper .swiper-pagination',
    paginationClickable: true,
    breakpoints: {
        768: {
			slidesPerView: 2
        },
        560: {
			slidesPerView: 1
        }
    }
});


// Video review slider

$('.js-videoSwiper').each(function(i){
	var videoSwiper = new Swiper('.js-videoSwiper:eq('+ i +') .swiper-container', {
	    speed: 300,
	    slidesPerView: 'auto',
        simulateTouch: false,
        nextButton: '.js-videoSwiper:eq('+ i +') .huge-arrow__right',
	    prevButton: '.js-videoSwiper:eq('+ i +') .huge-arrow__left',
	    pagination: '.js-videoSwiper:eq('+ i +') .swiper-pagination',
	    paginationClickable: true,
	    breakpoints: {
            768: {
				slidesPerView: 1,
				spaceBetween: 0,
				autoHeight: true
            }
        }
	});
});


// Video tiles slider

var videoTilesSwiper = new Swiper('.js-videoTilesSwiper .swiper-container', {
    speed: 300,
    slidesPerView: 'auto',
    simulateTouch: false,
    nextButton: '.js-videoTilesSwiper .huge-arrow__right',
    prevButton: '.js-videoTilesSwiper .huge-arrow__left',
    pagination: '.js-videoTilesSwiper .swiper-pagination',
    paginationClickable: true,
    breakpoints: {
        767: {
			slidesPerView: 1,
			spaceBetween: 0,
			autoHeight: true
        }
    }
});


// Similar slider

$('.js-similarSwiper').each(function(i){
    var similarSwiper = new Swiper('.js-similarSwiper:eq('+ i +') .swiper-container', {
        speed: 300,
        slidesPerView: 4,
        spaceBetween: 25,
        simulateTouch: false,
        nextButton: '.js-similarSwiper:eq('+ i +') .huge-arrow__right',
        prevButton: '.js-similarSwiper:eq('+ i +') .huge-arrow__left',
        pagination: '.js-similarSwiper:eq('+ i +') .swiper-pagination',
        paginationClickable: true,
        breakpoints: {
            768: {
    			slidesPerView: 1,
    			spaceBetween: 0,
    			autoHeight: true
            }
        }
    });
});

// Помощь в выборе

var helpChoosingSwiper = new Swiper('.js-helpChoosingSwiper .swiper-container', {
    speed: 300,
    spaceBetween: 0,
    simulateTouch: false,
    nextButton: '.js-helpChoosingSwiper .huge-arrow__right',
    prevButton: '.js-helpChoosingSwiper .huge-arrow__left',
    onSlideChangeStart: function(swiper){
    	var current = swiper.activeIndex + 1;

    	$('.js-questionActiveNum').text(current);
    },
    breakpoints: {
        768: {
			slidesPerView: 1,
			spaceBetween: 10,
			autoHeight: true
        }
    }
});

$('.js-helpChoosingSwiper input').on('change', function(){
    if($(window).width() <= 767){
    	helpChoosingSwiper.slideNext();

    	if($('.js-helpChoosingSwiper input:checked').length == $('.js-helpChoosingSwiper .swiper-slide').length){
    		$('.help-choosing__list').addClass('is-button-show');
    	}
    }
});

$(document).on('click', '.js-choosingButton', function(){
	$('.help-choosing__result').show();
	$('.help-choosing__questions').hide();
});

$(document).on('click', '.js-choosingBackLink', function(){
	$('.help-choosing__result').hide();
	$('.help-choosing__questions').show();
});



// Work example slider

$('.js-workExampleSwiper').each(function(i){
    var workExampleSwiper = new Swiper('.js-workExampleSwiper:eq('+ i +') .swiper-container', {
        speed: 300,
        simulateTouch: false,
        nextButton: '.js-workExampleSwiper:eq('+ i +') .huge-arrow__right',
        prevButton: '.js-workExampleSwiper:eq('+ i +') .huge-arrow__left',
        pagination: '.js-workExampleSwiper:eq('+ i +') .swiper-pagination',
        paginationClickable: true,
        breakpoints: {
            768: {
                slidesPerView: 1,
                spaceBetween: 0,
                autoHeight: true
            }
        }
    });
});


// Advantage slider

var advantageSwiper = new Swiper('.js-advantageSwiper .swiper-container', {
    speed: 600,
    slidesPerView: 4,
    spaceBetween: 25,
    simulateTouch: false,
    pagination: '.js-advantageSwiper .swiper-pagination',
    nextButton: '.js-advantageSwiper .huge-arrow__right',
    prevButton: '.js-advantageSwiper .huge-arrow__left',
    paginationClickable: true,
    breakpoints: {
        768: {
            slidesPerView: 1
        }
    }
});