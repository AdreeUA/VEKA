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