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