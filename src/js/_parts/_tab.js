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