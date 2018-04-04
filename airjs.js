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
		/*	
			var xhttp = new XMLHttpRequest();
			xhttp.onreadystatechange = function() {
				if (this.readyState == 4 && this.status == 200) {
				   // Typical action to be performed when the document is ready:
				   console.log(xhttp.responseText);
				   var obj = JSON.parse(xhttp.responseText);
				   var table = document.getElementById("currentTable");
				   
				   if(typeof obj.results[0].city !== 'undefined'){
						table.innerHTML = "";
						var row = table.insertRow(0);
						var cell = row.insertCell(0);
						cell.innerHTML = "City";
						cell = row.insertCell(1);
						cell.innerHTML = "Measurement";
						
						row = table.insertRow(1);
						cell = row.insertCell(0);
						cell.innerHTML = obj.results[0].city;
				   }
				}
			};
			var params = "&coordinates=" + mylat + "," + mylng;
			xhttp.open("GET", "https://api.openaq.org/v1/latest?"+params, true);
			xhttp.send();
			*/
		});
		
		map.addListener('idle', function(){
			var xhttp = new XMLHttpRequest();
			xhttp.onreadystatechange = function() {
				if (this.readyState == 4 && this.status == 200) {
				   // Typical action to be performed when the document is ready:
				   console.log(xhttp.responseText);
				   var obj = JSON.parse(xhttp.responseText);
				   var table = document.getElementById("currentTable");
				   
				   if(typeof obj.results[0].city !== 'undefined'){
						table.innerHTML = "";
						var row = table.insertRow(0);
						var cell = row.insertCell(0);
						cell.innerHTML = "City";
						cell = row.insertCell(1);
						cell.innerHTML = "Measurement";
						
						row = table.insertRow(1);
						cell = row.insertCell(0);
						cell.innerHTML = obj.results[0].city;
				   }
				}
			};
			var latitude = parseFloat(document.getElementById("latitude").value);
			var longitude = parseFloat(document.getElementById("longitude").value);
			
			var params = "&coordinates=" + latitude + "," + longitude;
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
		var params = "&coordinates=44.96,-93.26";
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
			
			/*
			var xhttp = new XMLHttpRequest();
			xhttp.onreadystatechange = function() {
				if (this.readyState == 4 && this.status == 200) {
				   // Typical action to be performed when the document is ready:
				   console.log(xhttp.responseText);
				   var obj = JSON.parse(xhttp.responseText);
				   var table = document.getElementById("currentTable");
				   
				   if(typeof obj.results[0].city !== 'undefined'){
						table.innerHTML = "";
						var row = table.insertRow(0);
						var cell = row.insertCell(0);
						cell.innerHTML = "City";
						cell = row.insertCell(1);
						cell.innerHTML = "Measurement";
						
						row = table.insertRow(1);
						cell = row.insertCell(0);
						cell.innerHTML = obj.results[0].city;
				   }
				}
			};
			var params = "&coordinates=" + mylat + "," + mylng;
			xhttp.open("GET", "https://api.openaq.org/v1/latest?"+params, true);
			xhttp.send();
			*/
		});
		
		
		map.addListener('idle', function(){
			var xhttp = new XMLHttpRequest();
			xhttp.onreadystatechange = function() {
				if (this.readyState == 4 && this.status == 200) {
				   // Typical action to be performed when the document is ready:
				   console.log(xhttp.responseText);
				   var obj = JSON.parse(xhttp.responseText);
				   var table = document.getElementById("currentTable");
				   
				   if(typeof obj.results[0].city !== 'undefined'){
						table.innerHTML = "";
						var row = table.insertRow(0);
						var cell = row.insertCell(0);
						cell.innerHTML = "City";
						cell = row.insertCell(1);
						cell.innerHTML = "Measurement";
						
						row = table.insertRow(1);
						cell = row.insertCell(0);
						cell.innerHTML = obj.results[0].city;
				   }
				}
			};
			var latitude = parseFloat(document.getElementById("latitude").value);
			var longitude = parseFloat(document.getElementById("longitude").value);
	
			var params = "&coordinates=" + latitude + "," + longitude;
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
				    var row = table.insertRow(1);
					var cell = row.insertCell(0);
					cell.innerHTML = obj.results[0].city;
			   }
			}
		};
		var latitude = parseFloat(document.getElementById("latitude").value);
		var longitude = parseFloat(document.getElementById("longitude").value);
		
		var params = "&coordinates=" + latitude + "," + longitude;
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