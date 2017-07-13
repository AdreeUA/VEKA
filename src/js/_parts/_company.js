$(document).on('click', '.js-company_date-link', function(event){ 
	event.preventDefault();
	var _this = $(this), 
		link = _this.data('company');

	_this.addClass('company__date-item-active').siblings().removeClass('company__date-item-active');
	$('[data-company-slide="' + link + '"]').show().siblings().hide();
});