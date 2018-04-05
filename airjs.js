function initMap() {
	var latitude = parseFloat(document.getElementById("latitude").value);
	var longitude = parseFloat(document.getElementById("longitude").value);
	
	var geocoder = new google.maps.Geocoder;
	var infowindow = new google.maps.InfoWindow;
	
	
	if(isNaN(latitude) == true && isNaN(longitude) == true){ //Before adding a marker
		var uluru = {lat: 44.96, lng: -93.26};
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
		
		map.addListener('idle', function(){
			var xhttp = new XMLHttpRequest();
			xhttp.onreadystatechange = function() {
				if (this.readyState == 4 && this.status == 200) {
				   // Typical action to be performed when the document is ready:
				   console.log(xhttp.responseText);
				   var obj = JSON.parse(xhttp.responseText);
				   var table = document.getElementById("currentTable");
				   
				    if(obj.results[0]){
						table.innerHTML = "";
						var row = table.insertRow(0);
						row.insertCell(0).outerHTML = "<th>City</th>";
						row.insertCell(1).outerHTML = "<th>Measurement</th>";
						console.log(obj.results.length);
						for(var i = 0; i < obj.results.length; i++){
							row = table.insertRow(i+1);
							var cell = row.insertCell(0);
							cell.innerHTML = obj.results[i].city;
							cell = row.insertCell(1);
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
						row.insertCell(1).outerHTML = "<th>Measurement</th>";
						row = table.insertRow(1);
						var cell = row.insertCell(0);
						cell.innerHTML = "Unknown";
						cell = row.insertCell(1);
						cell.innerHTML = "Unknown";
					}  
				}
			};
			var latitude = parseFloat(document.getElementById("latitude").value);
			var longitude = parseFloat(document.getElementById("longitude").value);
			
			
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
			console.log(radiusMeters);
			
			var params = "&coordinates=" + latitude + "," + longitude + "&radius=" + radiusMeters;
			xhttp.open("GET", "https://api.openaq.org/v1/latest?"+params, true);
			xhttp.send();
		});
		
		var latlng = {lat: 44.96, lng: -93.26};
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
		geocodeLatLng(geocoder, map, infowindow);
		
		var xhttp = new XMLHttpRequest();
		xhttp.onreadystatechange = function() {
			if (this.readyState == 4 && this.status == 200) {
			   // Typical action to be performed when the document is ready:
			   console.log(xhttp.responseText);
			}
		};
		var params = "&coordinates=44.96,-93.26" + "&radius=15000";
		xhttp.open("GET", "https://api.openaq.org/v1/latest?"+params, true);
		xhttp.send();
		
		
		
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
		
		
		map.addListener('idle', function(){
			var xhttp = new XMLHttpRequest();
			xhttp.onreadystatechange = function() {
				if (this.readyState == 4 && this.status == 200) {
				   // Typical action to be performed when the document is ready:
				   console.log(xhttp.responseText);
				   var obj = JSON.parse(xhttp.responseText);
				   var table = document.getElementById("currentTable");
				   
				   if(obj.results[0]){
						table.innerHTML = "";
						var row = table.insertRow(0);
						row.insertCell(0).outerHTML = "<th>City</th>";
						row.insertCell(1).outerHTML = "<th>Measurement</th>";
						console.log(obj.results.length);
						for(var i = 0; i < obj.results.length; i++){
							row = table.insertRow(i+1);
							var cell = row.insertCell(0);
							cell.innerHTML = obj.results[i].city;
							cell = row.insertCell(1);
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
						row.insertCell(1).outerHTML = "<th>Measurement</th>";
						row = table.insertRow(1);
						var cell = row.insertCell(0);
						cell.innerHTML = "Unknown";
						cell = row.insertCell(1);
						cell.innerHTML = "Unknown";
					}   
				}
			};
			var latitude = parseFloat(document.getElementById("latitude").value);
			var longitude = parseFloat(document.getElementById("longitude").value);
	
			var params = "&coordinates=" + latitude + "," + longitude + "&radius=15000";
			xhttp.open("GET", "https://api.openaq.org/v1/latest?"+params, true);
			xhttp.send();
		});
		
		
		geocodeLatLng(geocoder, map, infowindow);
		
		var xhttp = new XMLHttpRequest();
		xhttp.onreadystatechange = function() {
			if (this.readyState == 4 && this.status == 200) {
			   // Typical action to be performed when the document is ready:
			   console.log(xhttp.responseText);
			   var obj = JSON.parse(xhttp.responseText);
			   var table = document.getElementById("myTable");
			   
			   if(typeof obj.results[0].city !== 'undefined'){
				    table.innerHTML = "";
					var row = table.insertRow(0);
					row.insertCell(0).outerHTML = "<th>Marker City</th>";
					row.insertCell(1).outerHTML = "<th>Marker Measurement</th>";
					row = table.insertRow(1);
					var cell = row.insertCell(0);
					cell.innerHTML = obj.results[0].city;
			   }
			}
		};
		var latitude = parseFloat(document.getElementById("latitude").value);
		var longitude = parseFloat(document.getElementById("longitude").value);
		
		var params = "&coordinates=" + latitude + "," + longitude + "&radius=15000";
		xhttp.open("GET", "https://api.openaq.org/v1/latest?"+params, true);
		xhttp.send();
		
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