function initMap() {
	var latitude = parseFloat(document.getElementById("latitude").value);
	var longitude = parseFloat(document.getElementById("longitude").value);
	
	var geocoder = new google.maps.Geocoder;
	var infowindow = new google.maps.InfoWindow;
	
	
	if(isNaN(latitude) == true && isNaN(longitude) == true){ //Before adding a marker
		var uluru = {lat: 44.96, lng: -93.21};
		var map = new google.maps.Map(document.getElementById('map'), {
				zoom: 4,
				center: uluru
		});
		var marker = new google.maps.Marker({
			position: uluru,
			map: map
		})
		map.addListener('center_changed', function() {
			var mylat = map.getCenter().lat();
			var mylng = map.getCenter().lng();
			document.getElementById("latitude").value = mylat;
			document.getElementById("longitude").value = mylng;
		});
		
		
	}else{ //After adding a marker
		var uluru = {lat: latitude, lng: longitude};
		var map = new google.maps.Map(document.getElementById('map'), {
				zoom: 4,
				center: uluru
		});
		var marker = new google.maps.Marker({
			position: uluru,
			map: map
		})
		map.addListener('center_changed', function() {
			var mylat = map.getCenter().lat();
			var mylng = map.getCenter().lng();
			document.getElementById("latitude").value = mylat;
			document.getElementById("longitude").value = mylng;
		});
		
		geocodeLatLng(geocoder, map, infowindow);
	}
}

function geocodeLatLng(geocoder, map, infowindow) {
	var latitude = parseFloat(document.getElementById("latitude").value);
	var longitude = parseFloat(document.getElementById("longitude").value);
	var latlng = {lat: latitude, lng: longitude};


	geocoder.geocode({'location': latlng}, function(results, status) {
		if (status === 'OK') {
			if (results[0]) {
				map.setZoom(11);
				var marker = new google.maps.Marker({
					position: latlng,
					map: map
				});
				infowindow.setContent(results[0].formatted_address);
				infowindow.open(map, marker);
			} else {
				window.alert('No results found');
			}
		} else {
			window.alert('Geocoder failed due to: ' + status);
		}
	});
}