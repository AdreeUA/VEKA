var place;

$('.js-google-autocomplete').each(function(){
	var input = $(this)[0];
	var options = {
		types: ['(cities)'],
		componentRestrictions: {country: 'ru'}
	};

	autocomplete = new google.maps.places.Autocomplete(input, options);

	autocomplete.addListener('place_changed', function() {
		place = autocomplete.getPlace();
	});
});

$(window)
	.on('mousewheel', function(){
		if($('body').hasClass('mfp-open')){
			$('.js-google-autocomplete').blur();
		}
	})
	.on('touchmove', function() {
		$(window).trigger('mousewheel');
	});

/*
 * Где купить autocomplete
 */

$('.js-whereBuyAutocomplete').each(function(){
	var input = $(this)[0];
	var form = $(this).parents('form');
	var options = {
		types: ['(cities)'],
		componentRestrictions: {country: 'ru'}
	};

	autocomplete = new google.maps.places.Autocomplete(input, options);

	autocomplete.addListener('place_changed', function() {
		form.submit();
	});
});

/*
 * Проложить маршрут autocomplete
 */

$(function(){
	if($('body').find('.js-google-autocompleteAddress').length > 0){
		var input = $('.js-google-autocompleteAddress')[0];
		var options = {
			types: ['address'],
			componentRestrictions: {country: 'ru'}
		};

		autocomplete = new google.maps.places.Autocomplete(input, options);

		autocomplete.addListener('place_changed', function() {
			place = autocomplete.getPlace();

			if(!place){
				console.log('!place: ' + place);
				var locationOrigin = $('.js-google-autocompleteAddress').data('location').split(',');

				directionAddress.origin = new google.maps.LatLng(locationOrigin[0], locationOrigin[1]);

				console.log(directionAddress.origin);
			}
			else {
				console.log(place);
				directionAddress.origin = place.geometry.location;
			}

			$('.js-mapLabel').each(function(){
				if($(this).parent().hasClass('is-open')){
					var location = $(this).data('location').split(',');
					directionAddress.destination = new google.maps.LatLng(location[0], location[1]);

					console.log(directionAddress.destination)
				}
			});

			$('.js-directionButton').removeClass('disabled');
		});

		$(document).on('click', '[data-mfp-src="#directionModal"]', function(){
			if($('.js-google-autocompleteAddress').val() != ""){ 
				google.maps.event.trigger(autocomplete, 'place_changed');
			}
		});
	}
});