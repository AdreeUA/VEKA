// Маска ввода телефона
if($('.js-phone').length){
	$('.js-phone').mask('+7 (999) 999-99-99', {autoclear: false});
}

// Маска ввода телефона
if($('.js-datemask').length){
	$('.js-datemask').mask('99.99.9999');
}