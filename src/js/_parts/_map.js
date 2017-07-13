/*
 * Map
 */

var directionStart, 
	directionEnd;

var directionAddress = {
	origin: '',
	destination: ''
};

// Инициализация карты

function initializeMap(){
	var pinIcon = $('#map').data('pin'),
		clusterIcon = $('#map').data('cluster-icon'),
		mapLocation = $('#map').data('location').split(','),
		center = new google.maps.LatLng(mapLocation[0], mapLocation[1]),
		markerCluster,
		markersArray = [];

	var directionsService = new google.maps.DirectionsService;
    var directionsDisplay = new google.maps.DirectionsRenderer;
		
    var map = new google.maps.Map($('#map')[0], {
    	center: center,
        zoom: 10,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        scrollwheel: false,
        zoomControl: true,
        zoomControlOptions: {
			position: ($(window).width() > 767) ? google.maps.ControlPosition.RIGHT_TOP : google.maps.ControlPosition.LEFT_BOTTOM
	    },
		mapTypeControl: false,
		scaleControl: false,
		streetViewControl: false,
		rotateControl: false
    });

    // map.setOptions({draggable: $(window).width() < 767});

    directionsDisplay.setMap(map);

    // Добавляем метки на карту
    if($('body').find('.js-mapLabel').length > 0){
	    setMarkers();
	}

	function setMarkers(markers){
		var bounds = new google.maps.LatLngBounds();

		$('.js-mapLabel').each(function(){
			var _this = $(this);
			var location = $(this).data('location').split(',');

			var marker = new google.maps.Marker({
		        position: new google.maps.LatLng(location[0], location[1]),
		        map: map,
		        animation: google.maps.Animation.DROP,
		        icon: {
		            url: pinIcon,
		            scaledSize: new google.maps.Size(24, 29) 
		        }
		    });

			markersArray.push(marker);

		    bounds.extend(new google.maps.LatLng(location[0], location[1]));

			google.maps.event.addListener(marker, 'click', function() {
				var parent =_this.parents('.map-list__elem');

				if(!_this.parent().hasClass('is-open'))
					_this.trigger('click');

				if(!parent.hasClass('is-open'))
					parent.find('.map-list__label.js-toggleLink').trigger('click');

				if($(window).width() <= 767) {
					if(!$('.js-mapListToggle').hasClass('is-active')){
						$('.js-mapListToggle').trigger('click');
					}
				}

				if($(window).width() >= 768) {
					setTimeout(function(){
						apiScrollpane.scrollToElement($('.map-list__elem.is-open'));
					});
				}
			});

			_this.data('marker', marker);
		});

		markerCluster = new MarkerClusterer(map, markersArray, {styles: [{
            width: 48,
            height: 48,
            url: clusterIcon,
            textColor: 'white',
            textSize: 14
        }]});

        map.fitBounds(bounds);

        if(markersArray.length == 1)
        	setTimeout(function(){
				map.setZoom(14);
			}, 200);

	}

	$(document).on('click', '.js-mapLabel', function(){
		var location = $(this).data('location').split(','), 
			mapOffset = ($(window).width() >= 768) ? mapOffset = 0.035 : 0;

		map.panTo(new google.maps.LatLng(location[0], location[1] - mapOffset));
		map.setZoom(13);

		if(!$('.aside-map').hasClass('is-open')){
			$('.aside-map').addClass('is-open');
		}
	});

	// Проложить маршрут
	$(document).on('click', '.js-directionButton', function(event){
		event.preventDefault();

		calculateAndDisplayRoute(directionsService, directionsDisplay);
		$('.js-mfp-close').trigger('click');
		map.setZoom(map.getZoom() - 1);

		$('.js-google-autocompleteAddress')
			.val('')
			.val($('.js-google-autocompleteAddress').data('location-value'));
			
		$('.js-directionButton').addClass('disabled');

		if($(window).width() <= 767){
			$('body, html').animate({
				scrollTop: $('#map').offset().top - 60
			}, 400);
		}
	});

	// Позиционируем метку по центру
	$(document).on('setCenterActiveMarker', function(){
		$('.js-mapLabel').each(function(){
			if($(this).parent().hasClass('is-open')){
				var location = $(this).data('location').split(',');

				map.panTo(new google.maps.LatLng(location[0], location[1]));
				map.setZoom(13);
			}
		});
	});
}

if($('#map').length > 0){
	google.maps.event.addDomListener(window, 'load', initializeMap);
}

$(document).on('click', '.js-mapListToggle', function(){
	var el = $(this),
		label = el.find('.aside-map__toggle-label'),
		mapContent = $('.map__content');

	if(el.hasClass('is-active')){
		el.removeClass('is-active');
		mapContent.removeClass('is-sm');
		label.text(el.data('label'));
	}
	else {
		el.addClass('is-active');
		mapContent.addClass('is-sm');
		label.text(el.data('second-label'));
	}

	initializeMap();

	if($(window).width() <= 767){
		$(document).trigger('setCenterActiveMarker');
	}
});


function calculateAndDisplayRoute(directionsService, directionsDisplay) {
	directionsService.route({
		origin: directionAddress.origin,
		destination: directionAddress.destination,
		travelMode: 'DRIVING'
	}, 
	function(response, status) {
		if (status === 'OK') {
			directionsDisplay.setDirections(response);
		} 
		else {
			console.log('Directions request failed due to ' + status);
		}
	});
}

