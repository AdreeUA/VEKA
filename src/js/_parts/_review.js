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