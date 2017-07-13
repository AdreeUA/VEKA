/*
 * Валидация формы
 */

/*
 * Translated default messages for the jQuery validation plugin.
 * Locale: RU (Russian; русский язык)
 */
$.extend( $.validator.messages, {
	required: "Это поле необходимо заполнить.",
	remote: "Пожалуйста, введите правильное значение.",
	email: "Введите корректный email.",
	url: "Пожалуйста, введите корректный URL.",
	date: "Пожалуйста, введите корректную дату.",
	dateISO: "Пожалуйста, введите корректную дату в формате ISO.",
	number: "Пожалуйста, введите число.",
	digits: "Пожалуйста, вводите только цифры.",
	creditcard: "Пожалуйста, введите правильный номер кредитной карты.",
	equalTo: "Пожалуйста, введите такое же значение ещё раз.",
	extension: "Пожалуйста, выберите файл с правильным расширением.",
	maxlength: $.validator.format( "Пожалуйста, введите не больше {0} символов." ),
	minlength: $.validator.format( "Пожалуйста, введите не меньше {0} символов." ),
	rangelength: $.validator.format( "Пожалуйста, введите значение длиной от {0} до {1} символов." ),
	range: $.validator.format( "Пожалуйста, введите число от {0} до {1}." ),
	max: $.validator.format( "Пожалуйста, введите число, меньшее или равное {0}." ),
	min: $.validator.format( "Пожалуйста, введите число, большее или равное {0}." )
});

$(function(){
	var form = $('.js-validate');

	form.each(function(){
		$(this).validate({
			rules: {
		        EMAIL: {
		            required: true,
		            email: true
		        },
		        user_agreement: {
		        	required: true,
		        }
		    },
		    messages: {
		    	user_agreement: {
		    		required: "Пожалуйста, подтвердите согласие на обработку персональных данных."
		    	}
		    },
		    errorElement: 'span',
		    errorClass: 'error-label',
			// errorPlacement: function (error, element) {},
			highlight: function(element) {
				$(element).parent().addClass('error');

				setTimeout(function(){
					if($(element).attr('type') == 'checkbox' || $(element).hasClass('select')){
						var parent = $(element).parent();

						parent.append(parent.find('.error-label'));
					}
				});
	        },
	        unhighlight: function(element) {
				$(element).parent().removeClass('error');
	        }
		});
	});
});


$.validator.addMethod('phonecustom', function(value, element) {
	return value.match(/^\+7\s\([0-9]{3}\)\s[0-9]{3}\-[0-9]{2}\-[0-9]{2}$/);
}, 'Пожалуйста, введите корректный телефон.');

$.validator.addClassRules('js-phone', {
	phonecustom: true
});