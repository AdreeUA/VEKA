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