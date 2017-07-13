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

