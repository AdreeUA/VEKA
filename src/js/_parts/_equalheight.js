$(function(){
	$(window).on('load resize', function(){
		if($(window).width() >= 768){
			equalheight($('.js-equalheight'));
		}
	});
});