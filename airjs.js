function initMap() {
		var uluru = {lat: 44.96, lng: -93.26};
		var map = new google.maps.Map(document.getElementById('map'), {
				zoom: 10,
				center: uluru
		});
		var geocoder = new google.maps.Geocoder;
		var infowindow = new google.maps.InfoWindow;
		
		map.addListener('center_changed', function() {
			var mylat = map.getCenter().lat();
			var mylng = map.getCenter().lng();
			document.getElementById("latitude").value = mylat;
			document.getElementById("longitude").value = mylng;
		});
		
		map.addListener('idle', function(){
			var xhttp = new XMLHttpRequest();
			xhttp.onreadystatechange = function() {
				if (this.readyState == 4 && this.status == 200) {
				   // Typical action to be performed when the document is ready:
				   console.log(xhttp.responseText);
				   var obj = JSON.parse(xhttp.responseText);
				   var table = document.getElementById("currentTable");
				   
				    if(obj.results[0] && obj.results[0].coordinates && obj.results[0].city){
						table.innerHTML = "";
						var row = table.insertRow(0);
						row.insertCell(0).outerHTML = "<th>City</th>";
						row.insertCell(1).outerHTML = "<th>Latitude</th>";
						row.insertCell(2).outerHTML = "<th>Longitude</th>";
						row.insertCell(3).outerHTML = "<th>Measurement</th>";
						console.log(obj.results.length);
						for(var i = 0; i < obj.results.length; i++){
							row = table.insertRow(i+1);
							var cell = row.insertCell(0);
							cell.innerHTML = obj.results[i].city;
							cell = row.insertCell(1);
							cell.innerHTML = obj.results[i].coordinates.latitude;
							cell = row.insertCell(2);
							cell.innerHTML = obj.results[i].coordinates.longitude;
							cell = row.insertCell(3);
							cell.innerHTML = obj.results[i].measurements[0].value;
							
							var uluru = {lat: obj.results[i].coordinates.latitude, lng: obj.results[i].coordinates.longitude};
							var marker = new google.maps.Marker({
								position: uluru,
								map: map
							})
						}	
					}else{
						table.innerHTML = "";
						var row = table.insertRow(0);
						row.insertCell(0).outerHTML = "<th>City</th>";
						row.insertCell(1).outerHTML = "<th>Latitude</th>";
						row.insertCell(2).outerHTML = "<th>Longitude</th>";
						row.insertCell(3).outerHTML = "<th>Measurement</th>";
						row = table.insertRow(1);
						var cell = row.insertCell(0);
						cell.innerHTML = "Unknown";
						cell = row.insertCell(1);
						cell.innerHTML = "Unknown";
						cell = row.insertCell(2);
						cell.innerHTML = "Unknown";
						cell = row.insertCell(3);
						cell.innerHTML = "Unknown";
					}  
				}
			};
			
			var bounds = map.getBounds();
			var center = bounds.getCenter();
			var ne = bounds.getNorthEast();

			// r = radius of the earth in statute miles
			var r = 3963.0;  

			// Convert lat or lng from decimal degrees into radians (divide by 57.2958)
			var lat1 = center.lat() / 57.2958; 
			var lon1 = center.lng() / 57.2958;
			var lat2 = ne.lat() / 57.2958;
			var lon2 = ne.lng() / 57.2958;

			// distance = circle radius from center to Northeast corner of bounds
			var radiusMiles = r * Math.acos(Math.sin(lat1) * Math.sin(lat2) + 
			  Math.cos(lat1) * Math.cos(lat2) * Math.cos(lon2 - lon1));
			
			var radiusMeters = radiusMiles * 1609.34;
			
			var sel = document.getElementById("optionList");
			var txt= sel.options[sel.selectedIndex].text;
			
			
			var latitude = parseFloat(document.getElementById("latitude").value);
			var longitude = parseFloat(document.getElementById("longitude").value);
			
			var params = "&coordinates=" + latitude + "," + longitude + "&radius=" + radiusMeters + "&parameter=" + txt;
			xhttp.open("GET", "https://api.openaq.org/v1/latest?"+params, true);
			xhttp.send();
		});
		
		map.addListener('click', function(event){
			var latitude = event.latLng.lat();
			var longitude = event.latLng.lng();
			var uluru = {lat: latitude, lng: longitude};
			var marker = new google.maps.Marker({
				position: uluru,
				map: map
			});
			geocodeLatLng(geocoder, map, infowindow, latitude, longitude);
		});
		
		
		
}


function geocodeLatLng(geocoder, map, infowindow, latitude, longitude) {
	//var latitude = parseFloat(document.getElementById("latitude").value);
	//var longitude = parseFloat(document.getElementById("longitude").value);
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