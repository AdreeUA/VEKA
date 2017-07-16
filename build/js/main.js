/*
 * Helpers
 */
 
$(document).on('change input', '.js-numberOnly', function(){
    if (this.value.match(/[^0-9]/g)) {
        this.value = this.value.replace(/[^0-9]/g, '')
    }

    return false;
});
 
equalheight = function(container){
    var currentTallest = 0,
    currentRowStart = 0,
    rowDivs = new Array(),
    $el,
    topPosition = 0;

    $(container).each(function() {
        $el = $(this);
        $($el).height('auto')
        topPostion = $el.position().top;

        if (currentRowStart != topPostion) {
            for (currentDiv = 0 ; currentDiv < rowDivs.length ; currentDiv++) {
                rowDivs[currentDiv].height(currentTallest);
            }
            rowDivs.length = 0; // empty the array
            currentRowStart = topPostion;
            currentTallest = $el.height();
            rowDivs.push($el);
        } 
        else {
            rowDivs.push($el);
            currentTallest = (currentTallest < $el.height()) ? ($el.height()) : (currentTallest);
        }
        for (currentDiv = 0 ; currentDiv < rowDivs.length ; currentDiv++) {
            rowDivs[currentDiv].height(currentTallest);
        }
    });
}

$(function(){
    var ua = window.navigator.userAgent.toLowerCase(),
        ie = (/trident/gi).test(ua) || (/msie/gi).test(ua) || (/Windows Phone/gi).test(ua) || (/Edge/gi).test(ua);

    if(ie){
        $('body').addClass('ie');
    }
});

function scrollbarWidth() {
    var block = $('<div>').css({'height':'50px','width':'50px'}),
        indicator = $('<div>').css({'height':'200px'});

    $('body').append(block.append(indicator));
    var w1 = $('div', block).innerWidth();    
    block.css('overflow-y', 'scroll');
    var w2 = $('div', block).innerWidth();
    $(block).remove();
    return (w1 - w2);
}

function decles (count, words) {
	function cizz(n,c){
	    return c[0]+((/^[0,2-9]?[1]$/.test(n))?c[2]:((/^[0,2-9]?[2-4]$/.test(n))?c[3]:c[1]))
	}
	return cizz(count, words);
}

$(document).ready(function(){

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

	$(function(){
		$('.js-timer').each(function(){
			var countdown = $(this),
				date = new Date(countdown.data('date').replace(/(\d+).(\d+).(\d+)/, '$3/$2/$1'));
	
			countdown.countdown({
				until: date,
				format: 'dHM',
				padZeroes: true,
				onExpiry: promoEnd
			});
	
			function promoEnd(){
				if(countdown.parents('.swiper-slide'))
					countdown.parents('.swiper-slide').remove();
					$(document).trigger('promoSwiperUpdate');
			}
		});
	});

	
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

	// Маска ввода телефона
	if($('.js-phone').length){
		$('.js-phone').mask('+7 (999) 999-99-99', {autoclear: false});
	}
	
	// Маска ввода телефона
	if($('.js-datemask').length){
		$('.js-datemask').mask('99.99.9999');
	}

	function ratingInit(){
		$('.js-rating').each(function(){
			$(this).rating({
				fx: 'full',
		        image: $(this).data('icon') || 'images/stars.svg',
		        loader: $(this).data('loader') || 'images/ajax-loader.gif',
		        starSize: $(this).data('size') || 13,
		        stars: 5,
		        readOnly: $(this).data('readonly') || false,
				// url: 'rating.php',
		        callback: function(responce){
		            // this.vote_success.fadeOut(2000);
		        }
			});
		});
	}
	
	ratingInit();
	
	$(document).on('ratingUpdate', function(){
		ratingInit();
	});
	
	$(document).trigger('ratingUpdate');

	$(function(){
		if($(window).width() >= 768){
			$(window).on('load resize', function(){
				equalheight($('.review-tile__elem'));
			});
		}
	
		$(document).on('click', '.js-reviewToggleLink', function(event){
			event.preventDefault();
			
			var _this = $(this),
				label = _this.data('label'),
				secondLabel = _this.data('second-label'),
				parent = _this.parents('.review-tile__elem');
	
			if(parent.hasClass('is-full')){
				parent.removeClass('is-full');
				_this.find('span').text(label);
			}
			else {
				parent.addClass('is-full');
				_this.find('span').text(secondLabel);
			}
	
			reviewSwiper.update(true);
		});
	});

	$(function(){
	
	
	    // if ($(window).width() >= 1024){
	    //     var referenceGrid = $('.js-referenceIsotope').isotope({
	    //         itemSelector: '.reference__grid-col',
	    //         masonry: {
	    //             columnWidth: $(window).width() <= 1024 ? 10 : 20,
	    //             gutter: $(window).width() <= 1024 ? 10 : 25
	    //         },
	    //         percentPosition: true
	    //     });
	    //
	    //     referenceGrid.imagesLoaded().progress( function() {
	    //         referenceGrid.isotope('layout');
	    //     });
	    // }
	
		// $(window).resize(resizeGrid());
	});

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

	$(function(){
		$('.js-select').styler({
			singleSelectzIndex: 1,
			selectSmartPositioning: false,
			selectSearch: $(this).data('search') || false,
			onFormStyled: function () {
				
				$('.select__color .jq-selectbox__dropdown li').each(function () {
					var img = $(this).data('img');
					$(this).prepend('<img class="color-p" src="'+img+'">');
				});
			}
		});
	});

	/*
	 * Валидация формы
	 */
	
	/*
	 * Translated default messages for the jQuery validation plugin.
	 * Locale: RU (Russian; русский язык)
	 */
	$.extend( $.validator.messages, {
		required: "Это поле необходимо заполнить.",
		remote: "Пожалуйста, введите правильное значение.",
		email: "Введите корректный email.",
		url: "Пожалуйста, введите корректный URL.",
		date: "Пожалуйста, введите корректную дату.",
		dateISO: "Пожалуйста, введите корректную дату в формате ISO.",
		number: "Пожалуйста, введите число.",
		digits: "Пожалуйста, вводите только цифры.",
		creditcard: "Пожалуйста, введите правильный номер кредитной карты.",
		equalTo: "Пожалуйста, введите такое же значение ещё раз.",
		extension: "Пожалуйста, выберите файл с правильным расширением.",
		maxlength: $.validator.format( "Пожалуйста, введите не больше {0} символов." ),
		minlength: $.validator.format( "Пожалуйста, введите не меньше {0} символов." ),
		rangelength: $.validator.format( "Пожалуйста, введите значение длиной от {0} до {1} символов." ),
		range: $.validator.format( "Пожалуйста, введите число от {0} до {1}." ),
		max: $.validator.format( "Пожалуйста, введите число, меньшее или равное {0}." ),
		min: $.validator.format( "Пожалуйста, введите число, большее или равное {0}." )
	});
	
	$(function(){
		var form = $('.js-validate');
	
		form.each(function(){
			$(this).validate({
				rules: {
			        EMAIL: {
			            required: true,
			            email: true
			        },
			        user_agreement: {
			        	required: true,
			        }
			    },
			    messages: {
			    	user_agreement: {
			    		required: "Пожалуйста, подтвердите согласие на обработку персональных данных."
			    	}
			    },
			    errorElement: 'span',
			    errorClass: 'error-label',
				// errorPlacement: function (error, element) {},
				highlight: function(element) {
					$(element).parent().addClass('error');
	
					setTimeout(function(){
						if($(element).attr('type') == 'checkbox' || $(element).hasClass('select')){
							var parent = $(element).parent();
	
							parent.append(parent.find('.error-label'));
						}
					});
		        },
		        unhighlight: function(element) {
					$(element).parent().removeClass('error');
		        }
			});
		});
	});
	
	
	$.validator.addMethod('phonecustom', function(value, element) {
		return value.match(/^\+7\s\([0-9]{3}\)\s[0-9]{3}\-[0-9]{2}\-[0-9]{2}$/);
	}, 'Пожалуйста, введите корректный телефон.');
	
	$.validator.addClassRules('js-phone', {
		phonecustom: true
	});

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

	/*
	 * employees-requests
	 */
	
	$(function($) {
	  var allAccordions = $('.employees-requests__employee-row .employees-requests__acordion-content');
	  var allAccordionItems = $('.employees-requests__employee-row .employees-requests__flexrow');
	  $('.employees-requests__employee-row .employees-requests__flexrow').click(function() {
	    if($(this).hasClass('open'))
	    {
	      $(this).removeClass('open');
	      $(this).next().slideUp("slow");
	    }
	    else
	    {
		    allAccordions.slideUp("slow");
		    allAccordionItems.removeClass('open');
		    $(this).addClass('open');
		    $(this).next().slideDown("slow");
		    return false;
	    }
	  });
	});

	/*
	 * employees-requests
	 */
	
	$(function($) {
	  var allAccordions = $('.employees__employee-row > .employees__acordion-content');
	  var allAccordionItems = $('.employees__employee-row > .employees__flexrow');
	  $('.employees__employee-row > .employees__flexrow').click(function() {
	    if($(this).hasClass('open'))
	    {
	      $(this).removeClass('open');
	      $(this).next().slideUp("slow");
	    }
	    else
	    {
		    allAccordions.slideUp("slow");
		    allAccordionItems.removeClass('open');
		    $(this).addClass('open');
		    $(this).next().slideDown("slow");
		    return false;
	    }
	  });
	});

	$(function(){
		$(window).on('load resize', function(){
			if($(window).width() >= 768){
				equalheight($('.js-equalheight'));
			}
		});
	});

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

	// _parts/_autocomplete.js

	$(function(){
	    $(document).on('click', '.js-inlineModal', function(event) {
	        event.preventDefault();
	
	        var src = $(this).data('mfp-src'),
	            ajax = $(this).data('mfp-ajax') || 'inline';
	
	        $.magnificPopup.open({
	            items: {
	                src: src,
	                type: ajax
	            },
	            closeBtnInside: false,
	            callbacks: {
	                open: function() {
	                    $('body').addClass('mfp-open');
	                    headerMarginAdd();
	                    $(window).trigger('scroll');
	                },
	                close: function(){
	                    $('body').removeClass('mfp-open');
	                    headerMarginRemove();
	                }
	            }
	        });
	    });
	
	    $(document).on('click', '.js-mfp-close', function(){
	        $.magnificPopup.close();
	    });
	});
	
	function headerMarginAdd(){
	    $('.header.is-sticky').css({
	        'margin-right': ($(window).width() >= 768) ? scrollbarWidth() : 0
	    });
	}
	
	function headerMarginRemove(){
	    $('.header.is-sticky').css({
	        'margin-right': '0'
	    });
	}

	/*
	 * Compare
	 */
	
	
	$(function(){
		$(window).on('load resize', function(){
			var heightArrays = [];
	
			$('.compare__col').each(function(){
				$(this).find('.compare__row').each(function(){
					var _thisIndex = $(this).index();
	
					if(heightArrays[_thisIndex]){
						if($(this).height() > heightArrays[_thisIndex]){
							heightArrays[_thisIndex] = $(this).height();
						}
					}
					else {
						heightArrays.push($(this).height());
					}
				});
			});
	
			$('.compare__col').each(function(){
				$(this).find('.compare__row').each(function(i){
					$(this).height(heightArrays[i]);
				});
			});
		});
	});


	// Scrollpane
	
	if($(window).width() >= 768){
		if($('body').find('.js-scroll').length) {
			var scrollpane = $('.js-scroll').jScrollPane({
				autoReinitialise: true
			});
	
			var apiScrollpane = scrollpane.data('jsp');
		}
	}

	$(document).on('click', '.js-toggleLink', function(){
		var el = $(this).parent();
	
		if(el.hasClass('is-open')){
			el.removeClass('is-open');
		}
		else {
			el.addClass('is-open').siblings().removeClass('is-open');
		}
	});

	/*
	 * Map
	 */
	
	var directionStart, 
		directionEnd;
	
	var directionAddress = {
		origin: '',
		destination: ''
	};
	
	// Инициализация карты
	
	function initializeMap(){
		var pinIcon = $('#map').data('pin'),
			clusterIcon = $('#map').data('cluster-icon'),
			mapLocation = $('#map').data('location').split(','),
			center = new google.maps.LatLng(mapLocation[0], mapLocation[1]),
			markerCluster,
			markersArray = [];
	
		var directionsService = new google.maps.DirectionsService;
	    var directionsDisplay = new google.maps.DirectionsRenderer;
			
	    var map = new google.maps.Map($('#map')[0], {
	    	center: center,
	        zoom: 10,
	        mapTypeId: google.maps.MapTypeId.ROADMAP,
	        scrollwheel: false,
	        zoomControl: true,
	        zoomControlOptions: {
				position: ($(window).width() > 767) ? google.maps.ControlPosition.RIGHT_TOP : google.maps.ControlPosition.LEFT_BOTTOM
		    },
			mapTypeControl: false,
			scaleControl: false,
			streetViewControl: false,
			rotateControl: false
	    });
	
	    // map.setOptions({draggable: $(window).width() < 767});
	
	    directionsDisplay.setMap(map);
	
	    // Добавляем метки на карту
	    if($('body').find('.js-mapLabel').length > 0){
		    setMarkers();
		}
	
		function setMarkers(markers){
			var bounds = new google.maps.LatLngBounds();
	
			$('.js-mapLabel').each(function(){
				var _this = $(this);
				var location = $(this).data('location').split(',');
	
				var marker = new google.maps.Marker({
			        position: new google.maps.LatLng(location[0], location[1]),
			        map: map,
			        animation: google.maps.Animation.DROP,
			        icon: {
			            url: pinIcon,
			            scaledSize: new google.maps.Size(24, 29) 
			        }
			    });
	
				markersArray.push(marker);
	
			    bounds.extend(new google.maps.LatLng(location[0], location[1]));
	
				google.maps.event.addListener(marker, 'click', function() {
					var parent =_this.parents('.map-list__elem');
	
					if(!_this.parent().hasClass('is-open'))
						_this.trigger('click');
	
					if(!parent.hasClass('is-open'))
						parent.find('.map-list__label.js-toggleLink').trigger('click');
	
					if($(window).width() <= 767) {
						if(!$('.js-mapListToggle').hasClass('is-active')){
							$('.js-mapListToggle').trigger('click');
						}
					}
	
					if($(window).width() >= 768) {
						setTimeout(function(){
							apiScrollpane.scrollToElement($('.map-list__elem.is-open'));
						});
					}
				});
	
				_this.data('marker', marker);
			});
	
			markerCluster = new MarkerClusterer(map, markersArray, {styles: [{
	            width: 48,
	            height: 48,
	            url: clusterIcon,
	            textColor: 'white',
	            textSize: 14
	        }]});
	
	        map.fitBounds(bounds);
	
	        if(markersArray.length == 1)
	        	setTimeout(function(){
					map.setZoom(14);
				}, 200);
	
		}
	
		$(document).on('click', '.js-mapLabel', function(){
			var location = $(this).data('location').split(','), 
				mapOffset = ($(window).width() >= 768) ? mapOffset = 0.035 : 0;
	
			map.panTo(new google.maps.LatLng(location[0], location[1] - mapOffset));
			map.setZoom(13);
	
			if(!$('.aside-map').hasClass('is-open')){
				$('.aside-map').addClass('is-open');
			}
		});
	
		// Проложить маршрут
		$(document).on('click', '.js-directionButton', function(event){
			event.preventDefault();
	
			calculateAndDisplayRoute(directionsService, directionsDisplay);
			$('.js-mfp-close').trigger('click');
			map.setZoom(map.getZoom() - 1);
	
			$('.js-google-autocompleteAddress')
				.val('')
				.val($('.js-google-autocompleteAddress').data('location-value'));
				
			$('.js-directionButton').addClass('disabled');
	
			if($(window).width() <= 767){
				$('body, html').animate({
					scrollTop: $('#map').offset().top - 60
				}, 400);
			}
		});
	
		// Позиционируем метку по центру
		$(document).on('setCenterActiveMarker', function(){
			$('.js-mapLabel').each(function(){
				if($(this).parent().hasClass('is-open')){
					var location = $(this).data('location').split(',');
	
					map.panTo(new google.maps.LatLng(location[0], location[1]));
					map.setZoom(13);
				}
			});
		});
	}
	
	if($('#map').length > 0){
		google.maps.event.addDomListener(window, 'load', initializeMap);
	}
	
	$(document).on('click', '.js-mapListToggle', function(){
		var el = $(this),
			label = el.find('.aside-map__toggle-label'),
			mapContent = $('.map__content');
	
		if(el.hasClass('is-active')){
			el.removeClass('is-active');
			mapContent.removeClass('is-sm');
			label.text(el.data('label'));
		}
		else {
			el.addClass('is-active');
			mapContent.addClass('is-sm');
			label.text(el.data('second-label'));
		}
	
		initializeMap();
	
		if($(window).width() <= 767){
			$(document).trigger('setCenterActiveMarker');
		}
	});
	
	
	function calculateAndDisplayRoute(directionsService, directionsDisplay) {
		directionsService.route({
			origin: directionAddress.origin,
			destination: directionAddress.destination,
			travelMode: 'DRIVING'
		}, 
		function(response, status) {
			if (status === 'OK') {
				directionsDisplay.setDirections(response);
			} 
			else {
				console.log('Directions request failed due to ' + status);
			}
		});
	}

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

	$(function(){
		$(document)
			.on('click', '.js-shareLink', function(event){
				event.stopPropagation();
				$(this).toggleClass('is-active');
			})
			.on('click', function(event){
				if($('.share').has(event.target).length === 0){
			        $('.js-shareLink').removeClass('is-active');
			    }
			});
	});

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

	$(document).on('click', '.js-company_date-link', function(event){ 
		event.preventDefault();
		var _this = $(this), 
			link = _this.data('company');
	
		_this.addClass('company__date-item-active').siblings().removeClass('company__date-item-active');
		$('[data-company-slide="' + link + '"]').show().siblings().hide();
	});

	var place;
	
	$('.js-google-autocomplete').each(function(){
		var input = $(this)[0];
		var options = {
			types: ['(cities)'],
			componentRestrictions: {country: 'ru'}
		};
	
		autocomplete = new google.maps.places.Autocomplete(input, options);
	
		autocomplete.addListener('place_changed', function() {
			place = autocomplete.getPlace();
		});
	});
	
	$(window)
		.on('mousewheel', function(){
			if($('body').hasClass('mfp-open')){
				$('.js-google-autocomplete').blur();
			}
		})
		.on('touchmove', function() {
			$(window).trigger('mousewheel');
		});
	
	/*
	 * Где купить autocomplete
	 */
	
	$('.js-whereBuyAutocomplete').each(function(){
		var input = $(this)[0];
		var form = $(this).parents('form');
		var options = {
			types: ['(cities)'],
			componentRestrictions: {country: 'ru'}
		};
	
		autocomplete = new google.maps.places.Autocomplete(input, options);
	
		autocomplete.addListener('place_changed', function() {
			form.submit();
		});
	});
	
	/*
	 * Проложить маршрут autocomplete
	 */
	
	$(function(){
		if($('body').find('.js-google-autocompleteAddress').length > 0){
			var input = $('.js-google-autocompleteAddress')[0];
			var options = {
				types: ['address'],
				componentRestrictions: {country: 'ru'}
			};
	
			autocomplete = new google.maps.places.Autocomplete(input, options);
	
			autocomplete.addListener('place_changed', function() {
				place = autocomplete.getPlace();
	
				if(!place){
					console.log('!place: ' + place);
					var locationOrigin = $('.js-google-autocompleteAddress').data('location').split(',');
	
					directionAddress.origin = new google.maps.LatLng(locationOrigin[0], locationOrigin[1]);
	
					console.log(directionAddress.origin);
				}
				else {
					console.log(place);
					directionAddress.origin = place.geometry.location;
				}
	
				$('.js-mapLabel').each(function(){
					if($(this).parent().hasClass('is-open')){
						var location = $(this).data('location').split(',');
						directionAddress.destination = new google.maps.LatLng(location[0], location[1]);
	
						console.log(directionAddress.destination)
					}
				});
	
				$('.js-directionButton').removeClass('disabled');
			});
	
			$(document).on('click', '[data-mfp-src="#directionModal"]', function(){
				if($('.js-google-autocompleteAddress').val() != ""){ 
					google.maps.event.trigger(autocomplete, 'place_changed');
				}
			});
		}
	});

	/* 
	 * Tab
	 */
	
	$(document).on('click', '.js-tab-link', function(){
	
		var _this = $(this),
			content = $('' + _this.data('tab-link') + '');
	
		_this.parents('.js-tab').find('.js-tab-link').removeClass('is-active');
		_this.addClass('is-active');
	
		content
			.show()
			.siblings()
			.hide();
	
		return false;
	});

	

	// printAnyMaps :: _ -> HTML
	function printAnyMaps() {
	    var $body = $('body');
	    var $mapContainer = $('#map');
	    var $mapContainerParent = $mapContainer.parent();
	    var $printContainer = $('<div style="position:relative; left: -600px;">');
	
	    $printContainer
	        .height($mapContainerParent.height())
	        .append($mapContainer)
	        .prependTo($body);
	
	    var $content = $body
	        .children()
	        .not($printContainer)
	        .not('script')
	        .detach();
	
	    /**
	    * Needed for those who use Bootstrap 3.x, because some of
	    * its `@media print` styles ain't play nicely when printing.
	    */
	    var $patchedStyle = $('<style media="print">')
	        .text(
	          'img { max-width: none !important; }' +
	          'a[href]:after { content: ""; }'
	        )
	        .appendTo('head');
	
	    window.print();
	
	    $body.prepend($content);
	    $mapContainerParent.prepend($mapContainer);
	
	    $printContainer.remove();
	    $patchedStyle.remove();
	}
	
	$(document).on('click', '.js-printMapLink', function(){
	    printAnyMaps();
	});

	
	
	var solution = {
	
		answers: [],
	
		answer_list: $('.answer__list .list__tick'),
		result_links: $('#result_links'),
		result_solution: $('#result_solution'),
		result: $('#result'),
		result_profile: $('#result .link'),
		result_stp: $('#result_stp'),
		result_sequrity: $('#result_sequrity'),
	
		init: function () {
		
			$('.choosing__elem input').change(function () {
				
				solution.answers = $('.choosing__elem input:checked');
	
				solution.updateAnswerList();
	
				if (solution.answers.length == 5) {
					solution.showResult();
				} else {
					solution.hideResult();
				}
	
			});
			
		},
	
		showResult: function() {
	
	
			solution.result_links.show();
			solution.result_solution.show();
			solution.result.show();
	
			var res = [];
			
			for (var i = 0; i < solution.answers.length; i++) {	
				if (solution.answers[i].name == 'question_1') {
					res[0] = $(solution.answers[i]).val();
				}
				if (solution.answers[i].name == 'question_2') {
					res[1] = $(solution.answers[i]).val();
				}
				if (solution.answers[i].name == 'question_3') {
					res[2] = $(solution.answers[i]).val();
				}
				if (solution.answers[i].name == 'question_4') {
					res[3] = $(solution.answers[i]).val();
				}
				if (solution.answers[i].name == 'question_5') {
					res[4] = $(solution.answers[i]).val();
				}
			}
	
			var profile_text = '';
			var stp_text = '';
			var sequrity_text = '';
	
			console.log(res);
	
			// Профиль
			switch (true) {
				case (res[0] == 3): profile_text = 'EUROLINE';
					break;
				case (res[0] == 2 && res[1] == 1): profile_text = 'PROLINE';
					break;
				case (res[0] == 2 && res[1] == 2): profile_text = 'SOFTLINE';
					break;
				case (res[0] == 2 && res[1] == 3): profile_text = 'SWINGLINE';
					break;
				case (res[0] == 1 && (res[1] == 3 || res[1] == 1)): profile_text = 'SOFTLINE 82';
					break;
				case (res[0] == 1 && res[1] == 2): profile_text = 'ALPHALINE';
					break;
			}
	
			// Стеклопакет
			switch (true) {
				case (res[2] == 1 || res[2] == 2): stp_text = 'Двухкамерный';
					break;
				case (res[2] == 3): stp_text = 'Аккустический';
					break;
			}
	
			// Детская безопасность
			switch (true) {
				case (res[3] == 1): sequrity_text = 'Нет';
					break;
				case (res[3] == 2): sequrity_text = 'Детский замок и триплекс';
					break;
				case (res[3] == 3): sequrity_text = 'Триплекс';
					break;
			}
	
			solution.result_profile.text(profile_text);
			solution.result_stp.text(stp_text);
			solution.result_sequrity.text(sequrity_text);
		},
	
		hideResult: function() {
	
			solution.result_links.hide();
			solution.result_solution.hide();
			solution.result.hide();
	
		},
	
		updateAnswerList: function() {
	
			var t = '';
			
			console.log(solution.answers.length);
	
			for (var i = 0; i < solution.answers.length; i++) {
				
				var text = $(solution.answers[i]).parent().find('span').text();
	
				t += '<li><b>' + text + '</b></li>';
			}
	
			solution.answer_list.html(t);
		}
	
	}
	
	
	
	$(document).ready(function () {
		solution.init();
	});

	/*
	 * datepicker init
	 */
	
	$(function($) {
	    $('[data-toggle="datepicker"]').datepicker({
	        format: 'dd.mm.yyyy'
	    });
	});

	$(function($) {
	    var $tablesWrap = $('.working-table'),
	        $select = $tablesWrap.find('select'),
	        $checkbox = $tablesWrap.find('.working-table__checkbox-field input[type="checkbox"]');
	
	    function changeCheckboxHandler() {
	        var $this = $(this),
	            checked = $this.is(':checked'),
	            siblingTimes = $this.siblings('.working-table__edit-times'),
	            workTimeText = $this.closest('th').find('.working-table__time');
	
	        if (!checked) {
	            siblingTimes.slideUp();
	            // workTimeText.addClass('working-table__time_off')
	
	        } else {
	            siblingTimes.slideDown();
	            // workTimeText.removeClass('working-table__time_off')
	        }
	    }
	
	    $checkbox.on('change', changeCheckboxHandler);
	
	    $tablesWrap.on('click', '.working-table__edit', function (e) {
	        e.preventDefault();
	        $(this)
	            .closest('.working-table')
	            .addClass('working-table_open')
	            // .removeClass('working-table_empty');
	    });
	
	    $tablesWrap.on('click', '.js-cancel', function (e) {
	        e.preventDefault();
	        $(this)
	            .closest('.working-table')
	            .removeClass('working-table_open');
	    })
	});

	$(function($) {
	
	    if ($('.setting-price__table').length) {
	
	        var $table = $('.setting-price__table'),
	            $tableSticky = $('.setting-price__table-sticky'),
	            $changePriceBtn = $('.js-change-price'),
	            $inputs = $('.setting-price__price-input'),
	            $allSettingsPrice = $('.setting-price__price'),
	            tablePos = $table.offset().top,
	            isReady = true;
	
	        $(window).scroll(function(){
	
	            var winScrollTop = $(this).scrollTop();
	
	            if (winScrollTop > tablePos){
	
	
	                if (isReady) {
	                    var cloneTableHead = $table.find('thead').clone(),
	                        isHeaderSticky = $('.header').hasClass('is-sticky');
	
	                    $tableSticky.html(cloneTableHead);
	                    $tableSticky.addClass('is-show');
	                    $tableSticky.width($table.width());
	                    isHeaderSticky && $tableSticky.addClass('header-sticky');
	
	                    setTimeout(function () {
	                        $tableSticky.addClass('is-sticky');
	                    }, 20);
	
	                    isReady = false;
	
	                }
	
	            } else {
	                $tableSticky.removeClass('is-show is-sticky header-sticky');
	                $tableSticky.find('thead').remove();
	
	                isReady = true;
	            }
	
	        });
	
	        $changePriceBtn.click(function (e) {
	            e.preventDefault();
	            $table.toggleClass('setting-price__table_edit-all')
	        });
	
	        $table.on('click', function (e) {
	
	            $allSettingsPrice.removeClass('setting-price__price_edit');
	
	            if ($(e.target).closest('.setting-price__price').length) {
	
	                var $settingsPrice = $(e.target).closest('.setting-price__price'),
	                    $input = $settingsPrice.find('.setting-price__price-input'),
	                    inputValue = $input.val();
	
	                $settingsPrice.addClass('setting-price__price_edit');
	
	                if ($(e.target).is('.setting-price__save')) {
	                    var value = $settingsPrice
	                            .find('.setting-price__price-input')
	                            .val(),
	                        $inputPlaceholder = $settingsPrice
	                            .find('.setting-price__input-value');
	
	                    $settingsPrice.removeClass('setting-price__price_edit');
	                    $inputPlaceholder.text(value)
	
	                    if (!value) {
	
	                        $settingsPrice.addClass('setting-price__price_empty');
	                        $inputPlaceholder.text('Не указано')
	
	                    }
	
	                }
	
	                if (!inputValue) {
	                    $settingsPrice.addClass('setting-price__price_empty')
	                } else {
	                    $settingsPrice.removeClass('setting-price__price_empty')
	                }
	            }
	
	
	        });
	
	        $inputs.each(function () {
	            var $this = $(this);
	
	            $this.keydown(function(e){
	
	                if (e.keyCode === 13) {
	                    $this
	                        .closest('.setting-price__price')
	                        .removeClass('setting-price__price_edit')
	                        .blur();
	
	                    $this
	                        .siblings('.setting-price__input-value')
	                        .text($this.val());
	                }
	
	            });
	        });
	
	        $inputs.on('change', function () {
	            var $this = $(this),
	                value = $this.val(),
	                $parent = $this.closest('.setting-price__price'),
	                $inputPlaceholder = $this.siblings('.setting-price__input-value');
	
	            if (!$.isNumeric(value) ) {
	                $this.val('')
	            }
	
	            if (!value) {
	
	                $parent.addClass('setting-price__price_empty')
	                $inputPlaceholder.text('Не указано')
	
	            } else {
	
	                $parent.removeClass('setting-price__price_empty')
	
	            }
	        });
	
	        $inputs.on('focus', function () {
	
	            var $this = $(this),
	                $parent = $this.closest('.setting-price__price');
	
	            if ($parent.hasClass('setting-price__price_empty')) {
	                $parent.removeClass('setting-price__price_empty')
	            }
	
	        })
	
	        $inputs.on('blur', function () {
	
	            var $this = $(this),
	                $parent = $this.closest('.setting-price__price'),
	                value = $this.val();
	
	            if (!value) {
	                $parent.addClass('setting-price__price_empty')
	            }
	
	        })
	
	        $table.on('click', '.js-delete-region', function () {
	            var $this = $(this),
	                $regionDataAll = $table.find('[data-region]'),
	                currentValueRegionData = $this.closest('[data-region]').attr('data-region'),
	                result = confirm('Вы уверены');
	
	
	            if (result) {
	                $('[data-region='+ currentValueRegionData + ']').remove()
	            }
	        });
	
	
	    }
	
	});

	$(function($) {
	   var $checkboxAll = $('.js-checkbox-all');
	
	    $checkboxAll.click(function () {
	        var $this = $(this).find('input'),
	            checked = $this.prop('checked'),
	            $checkboxs = $this
	                .closest('.settings__content')
	                .find('.settings-notifications')
	                .find('input[type="checkbox"]');
	
	        console.log('---', checked);
	
	        $checkboxs.each(function () {
	            $(this).prop('checked', checked)
	        })
	    })
	});

});
	/*
	 * Calc
	 */
	
	$(function(){
		var calcPanel = $('.calc-panel');
	
		$(document).on('click', '.js-favToggleLink', function(){
			calcPanel.toggleClass('is-open');
		});
	
		$(document).on('click', '.js-favHideLink', function(){
			calcPanel.removeClass('is-open');
		});
	});
	
	
	var calculator = {
		windows: [],
		data: {
			//решение Века
			decisions: [ // http://joxi.ru/Q2KDPpqI40nloA - вот это говно должно падать туда
				{
					id: 1,
					title: "Окно для загородного дома"
				},
				{
					id: 2,
					title: "Окно для защиты от шума"
				},
				{
					id: 3,
					title: "Окно для детской"
				},
				{
					id: 4,
					title: "Окно с защитой от взлома"
				},
				{
					id: 5,
					title: "Энергоэффективное окно"
				},
				{
					id: 6,
					title: "Простое окно"
				}
			],
			// Профиль Века
			profiles: [
				{
					id: 1,
					title: "EUROLINE"
				},
				{
					id: 2,
					title: "VEKASLIDE"
				},
				{
					id: 3,
					title: "PROLINE"
				},
				{
					id: 4,
					title: "SOFTLINE"
				},
				{
					id: 5,
					title: "SOFTLINE 82"
				}, 
				{
					id: 6,
					title: "ALPHALINE"
				}
			],
			// Стеклопакет
			glazed: [
				{
					id: 1,
					title: "Двухкамерные стеклопакеты"
				},
				{
					id: 2,
					title: "Однокамерные стеклопакеты"
				},
				{
					id: 3,
					title: "Энергосберегающие стеклопакеты"
				},
				{
					id: 4,
					title: "Декоративная раскладка"
				}
			],
			//цвет
			colors: [ //http://veka.demo.notamedia.ru/bitrix/admin/iblock_element_admin.php?IBLOCK_ID=30&type=production&lang=ru&find_el_y=Y
				{
					id: 1,
					title: 'Белый',
					image: 'http://veka.demo.notamedia.ru/upload/iblock/cc8/cc87f8cf7e604311b4c5fe6c7f254bda.jpg'
				},
				{
					id: 2,
					title: 'вариант 2',
					image: 'http://veka.demo.notamedia.ru/upload/iblock/799/7991090fb7daa42fb921fdeb1687386c.jpg'
				},
				{
					id: 3,
					title: 'вариант 3',
					image: 'http://veka.demo.notamedia.ru/upload/iblock/761/761b000ebb2caad0e170c8b05e1194cc.jpg'
				},
				{
					id: 4,
					title: 'вариант 4',
					image: 'http://veka.demo.notamedia.ru/upload/iblock/e4d/e4df667da1aae044ec3c12c1433ab7cf.jpg'
				},
				{
					id: 5,
					title: 'вариант 5',
					image: 'http://veka.demo.notamedia.ru/upload/iblock/74d/74d414fbb234859ca284a85673322d57.jpg'
				},
				{
					id: 6,
					title: 'вариант 6',
					image: 'http://veka.demo.notamedia.ru/upload/iblock/7b9/7b9e01fdca59498c43e93bd6c1f580b1.jpg'
				},
				{
					id: 7,
					title: 'вариант 7',
					image: 'http://veka.demo.notamedia.ru/upload/iblock/b0a/b0a5b28bf00c3f5aea09b2475ead1f2b.jpg'
				}
			],
			sashes: [
				{
					id: 'g',
					title: "Глухое"
				},
				{
					id: 'po',
					title: "Поворотно-откидное"
				},
				{
					id: 'p',
					title: "Поворотное"
				},
				{
					id: 'o',
					title: "Откидное"
				}
			],
			formats: [
				{
					id: 1,
					title: "Одностворчатое окно",
					sashes: ['p']
				},
				{
					id: 2,
					title: "Двухстворчатое окно",
					sashes: ['g','po']
				},
				{
					id: 3,
					title: "Трехстворчатые окна",
					sashes: ['g','po','g']
				},
				{
					id: 4,
					title: "Трехстворчатые окна с фрамугой",
					sashes: ['o','g','po','g']
				},
				{
					id: 5,
					title: "Балконный блок двухстворчатый",
					sashes: ['po','g','po']
				},
				{
					id: 6,
					title: "Балконный блок одностворчатый",
					sashes: ['po','po']
				},
				{
					id: 7,
					title: "Нестандартная конструкция",
					sashes: ['g','po','g']
				}
			]
		},
		inputs: {
			decisions: $('select[name="decisions"]'),
			profiles:  $('select[name="profiles"]'),
			glazed:    $('select[name="glazed"]'),
			colors:    $('select[name="color"]'),
			weight:    $('input[name="weight"]'),
			height:    $('input[name="height"]'),
			name:      $('input[name="name"]')
		},
		init: function () {
			this.getBuffer();
	
			for (input in this.inputs) {
				watchInput(input);
			};
			$('.js-new-window').click(function () {
				calculator.newWindow();
				calculator.renderPage();
			});
			$('.window-type__elem').click(function () {
				calculator.current.formats = $(this).data('id');
	
				for (var i = 0; i < calculator.data.formats.length; i++) {
					if (calculator.data.formats[i].id == calculator.current.formats) {
						calculator.current.sashes = calculator.data.formats[i].sashes;
					}
				}
	
				calculator.saveBuffer();
				calculator.renderPage();
			});
		},
		renderPage: function () {
			this.inputs.name.val(this.current.name);
			renderText('.section__title', this.current.name);
	
			this.inputs.weight.val(this.current.weight);
			renderText('.window-image__size.width span', this.current.weight+' мм');
			this.inputs.height.val(this.current.height);
			renderText('.window-image__size.height span', this.current.height+' мм');
	
			renderHtml(this.data.decisions, this.inputs.decisions, this.current.decisions);
			renderHtml(this.data.profiles, this.inputs.profiles, this.current.profiles);
			renderHtml(this.data.glazed, this.inputs.glazed, this.current.glazed);
			renderHtml(this.data.colors, this.inputs.colors, this.current.colors, 'c');
	
			$('.window-type__elem').removeClass('is-active');
			$('.window-type__elem[data-id="'+this.current.formats+'"]').addClass('is-active');
	
			$('.js-favToggleLink .calc-panel__count').html('- '+this.windows.length+decles(this.windows.length,[' ок','он','но','на']));
			
			var html = '';
			for (var i = 0; i < this.windows.length; i++) {		
				html += '<div class="window-fav__elem">\
				    <div onclick="calculator.openWindow('+this.windows[i].id+')" class="window-fav__icon">\
				        <svg class="icon icon-window-type'+(this.windows[i].formats!=1?'-'+this.windows[i].formats:'')+'">\
				            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-window-type'+(this.windows[i].formats!=1?'-'+this.windows[i].formats:'')+'"></use>\
				        </svg>\
				    </div>\
				    <div onclick="calculator.openWindow('+this.windows[i].id+')" class="window-fav__info">\
				        <div class="window-fav__title">'+this.windows[i].name+'</div>\
				        <div class="window-fav__size">'+this.windows[i].weight+' х '+this.windows[i].height+' мм</div>\
				    </div>\
				    <div class="window-fav__controls">\
				        <div onclick="calculator.copyWindow('+this.windows[i].id+')" class="window-fav__control">\
				            <svg class="icon icon-doc ">\
				                <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-doc"></use>\
				            </svg>\
				        </div>\
				        <div onclick="calculator.removeWindow('+this.windows[i].id+')" class="window-fav__control">\
				            <svg class="icon icon-trash ">\
				                <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-trash"></use>\
				            </svg>\
				        </div>\
				    </div>\
				</div>';
				$('.calc-panel__window .window-fav').html(html);
			}
	
			if (this.current.sashes.length) {
				console.log(this.current.sashes);
				var sashes = '';
				$('.sashes-bl').html('');
				for (var i = 0; i < this.current.sashes.length; i++) {
					sashes = '<select data-ind="'+i+'" class="select select-sashes js-select">';
					for (var k = 0; k < this.data.sashes.length; k++) {
						sashes +='<option value="'+this.data.sashes[k].id+'">'+this.data.sashes[k].title+'</option>'
					}
					sashes += '</select>';
					$('.sashes-bl').append(sashes);
					$('.select-sashes[data-ind="'+i+'"]').val(this.current.sashes[i]);
				}
				$('.select-sashes').styler({
					singleSelectzIndex: 1,
					selectSmartPositioning: false,
					selectSearch: $(this).data('search') || false,
					onSelectClosed: function () {
						var ind = $(this).data('ind');
						for (var i = 0; i < calculator.current.sashes.length; i++) {
							if (ind == i) {
								calculator.current.sashes[i] = $(this).find('select').val();
								break;
							}
						}
						calculator.saveBuffer();
						calculator.getImage();
					}
				});
			}
			else {
				$('.sashes-bl').html('<textarea placeholder="описание конструкции в произвольной форме"></textarea>');
			}
			this.getImage();
		},
		getImage: function () {
			var link = '/local/templates/.default/markup_veka/build/images/windows/'+this.current.formats+'/'+this.current.colors+'/';
			console.log(this.current.sashes);
			for (var i = 0; i < this.current.sashes.length; i++) {
				link += this.current.sashes[i];
				if (i != this.current.sashes.length-1) {
					link +='_';
				}
			}
			link +='.jpg';
			console.log(link);
			$('.window-image__elem img').attr({'src':link});
		},
		copyWindow: function (id) {
			for (var i = 0; i < this.windows.length; i++) {
				if(this.windows[i].id == id) {
					var copiedObject = $.extend({}, this.windows[i])
					copiedObject.id = Date.now();
					copiedObject.name += ' - копия';
					this.windows.push(copiedObject);
					this.saveBuffer();
					this.renderPage();
				}
			}
		},
		removeWindow: function (id) {
			if (this.windows.length == 1) {
				alert('Должно быть минимум одно окно');
				return false;
			}
			for (var i = 0; i < this.windows.length; i++) {
				if(this.windows[i].id == id) {
					this.windows.splice(i,1);
					this.saveBuffer();
					this.renderPage();
				}
			}
		},
		openWindow: function (id) {
			for (var i = 0; i < this.windows.length; i++) {
				if(this.windows[i].id == id) {
					this.current = this.windows[i];
					this.saveBuffer();
					this.renderPage();
					$('.calc-panel').toggleClass('is-open');
				}
			}
		},
		initWindow: function (window) {
			for (var i = 0; i < this.data.formats.length; i++) {
				if (this.data.formats[i].id == window.formats) {
					window.sashes = this.data.formats[i].sashes;
				}
			}
			this.windows.push(window);
			this.current = this.windows[this.windows.length-1];
		},
		newWindow: function () {
			this.initWindow({
				id: Date.now(),
				name: "Окно на кухню",
				weight: 1300,
				height: 1460,
				decisions: 1,
				profiles: 1,
				glazed: 1,
				formats: 2,
				colors: 1
			});
			this.saveBuffer();
		},
		getBuffer: function () {
			this.windows = JSON.parse(sessionStorage.getItem('windows'));
			if (!this.windows) {
				this.windows = [];
				this.newWindow();
			}
			else {
				this.current = this.windows[this.windows.length-1];
			}
			this.renderPage();
		},
		saveBuffer: function () {
			var windows = JSON.stringify(this.windows)
			sessionStorage.setItem('windows', windows);
		},
		current: {}
	}
	
	function watchInput (input){
		var type = '';
		if (calculator.inputs[input].attr('type') == 'text') {
			type = 'keyup';
		}
		else {
			type = 'change';	
		}
	
		calculator.inputs[input].on(type, function () {
			var val = $(this).val();
			if (calculator.inputs[input].attr('name') == 'weight' || calculator.inputs[input].attr('name') == 'height') {
				console.log(213);
				var rep = /[-\.;":'a-zA-Zа-яА-Я]/; 
			    if (rep.test(val)) { 
			    	console.log(33)
			        val = val.replace(rep, '');  
			    } 
			}
			calculator.current[input] = val;
			calculator.renderPage();
			calculator.saveBuffer();
		});
	}
	
	function renderText (selector, text) {
		$(selector).html(text);
	}
	
	function renderHtml (data, input, current, type) {
		var decisionHtml = '';
		for (var i = 0; i < data.length; i++) {
			decisionHtml += '<option '+(data[i].image?'data-img="'+data[i].image+'"':'')+' value="'+data[i].id+'">'+data[i].title+'</option>'
		}
		input.html(decisionHtml).val(current).trigger('refresh');
		if (type) {
			var c = '';
			for (var i = 0; i < data.length; i++) {
				if (data[i].id == current) {
					c = data[i].image;
				}
			}
			$('.select__color .jq-selectbox__select').prepend('<img class="color-p" src="'+c+'">');
	
			$('.select__color .jq-selectbox__dropdown li').each(function () {
				var img = $(this).data('img');
				$(this).prepend('<img class="color-p" src="'+img+'">');
			});
		}
	}
	
	$(document).ready(function () {
		calculator.init();
	});