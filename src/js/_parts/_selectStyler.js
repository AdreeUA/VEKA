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