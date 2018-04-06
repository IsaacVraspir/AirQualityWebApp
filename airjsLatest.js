function initMap() {
	var d =  new Date(new Date().getTime() - 24 * 60 * 60 * 1000);
	var n = d.toISOString();
	n = n.substring(0, 10);
	document.getElementById("dateFrom").value = n;
	
	var dtwo = new Date();
	var ntwo = d.toISOString();
	ntwo = ntwo.substring(0, 10);
	document.getElementById("dateTo").value = ntwo;
	
	var uluru = {lat: 44.96, lng: -93.26};
	var map = new google.maps.Map(document.getElementById('map'), {
			zoom: 10,
			center: uluru,
			gestureHandling: 'greedy'
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
			   
				if(obj.results[0] && obj.results[0].coordinates && obj.results[0].city && obj.results[0].measurements){
					table.innerHTML = "";
					var row = table.insertRow(0);
					row.insertCell(0).outerHTML = "<th>City</th>";
					row.insertCell(1).outerHTML = "<th>Latitude</th>";
					row.insertCell(2).outerHTML = "<th>Longitude</th>";
					row.insertCell(3).outerHTML = "<th>Measurement</th>";
					row.insertCell(4).outerHTML = "<th>Chemical</th>";
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
						//cell.innerHTML = obj.results[i].value;
						cell.innerHTML = obj.results[i].measurements[0].value;
						cell = row.insertCell(4);
						//cell.innerHTML = obj.results[i].parameter;
						cell.innerHTML = obj.results[i].measurements[0].parameter;
						
						var uluru = {lat: obj.results[i].coordinates.latitude, lng: obj.results[i].coordinates.longitude};
						var marker = new google.maps.Marker({
							position: uluru,
							map: map
						})
						var message = obj.results[i].measurements[0].value;
						message = message.toString();
						addInfoWindow(marker, message);
						/*
						marker.addListener('mouseover', function() {
							//var contentString = obj.results[0].value;
							//var contentString = obj.results[i].measurements[0].value;
							//var contentString = table.row[i+1].cell[3].innerHTML;
							var contentString = "";
							//for (var j = 0; j < obj.results.length; j++){
								//if(table.row[j].cell[1].innerHTML == marker.getPosition().lat() && table.row[j].cell[2].innerHTML == marker.getPosition().lng()){
							//	if(obj.results[j].coordinates.latitude == marker.getPosition().lat() && obj.results[j].coordinates.longitude == marker.getPosition().lng()){
							//		contentString = obj.results[j].measurements[0].value;
							//		break;
							//	}
							//}
							contentString = this.getPosition().lat();
							contentString = contentString.toString();
							var infowindow = new google.maps.InfoWindow({
								content: contentString
							});	
							infowindow.open(map, this)
						});

						marker.addListener('mouseout', function() {
							infowindow.close();
						});
						*/
					}
				}else{
					table.innerHTML = "";
					var row = table.insertRow(0);
					row.insertCell(0).outerHTML = "<th>City</th>";
					row.insertCell(1).outerHTML = "<th>Latitude</th>";
					row.insertCell(2).outerHTML = "<th>Longitude</th>";
					row.insertCell(3).outerHTML = "<th>Measurement</th>";
					row.insertCell(4).outerHTML = "<th>Chemical</th>";
					row = table.insertRow(1);
					var cell = row.insertCell(0);
					cell.innerHTML = "Unknown";
					cell = row.insertCell(1);
					cell.innerHTML = "Unknown";
					cell = row.insertCell(2);
					cell.innerHTML = "Unknown";
					cell = row.insertCell(3);
					cell.innerHTML = "Unknown";
					cell = row.insertCell(4);
					cell.innerHTML = "Unknown";
				}  
			}
		};
		
		//RADIUS CALCULATION
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

		//Chemical Options
		var sel = document.getElementById("optionList");
		var txt= sel.options[sel.selectedIndex].text;
		
		
		var latitude = parseFloat(document.getElementById("latitude").value);
		var longitude = parseFloat(document.getElementById("longitude").value);
		
		var valueFrom = parseFloat(document.getElementById("valueFrom").value);
		console.log(valueFrom);
		var valueTo = parseFloat(document.getElementById("valueTo").value);
		
		//var dateTo = new Date();
		//var n = dateTo.toISOString();
		var dateTo = document.getElementById("dateTo").value;
		var dateFrom = document.getElementById("dateFrom").value;
		console.log(dateFrom);
		
		//var params = "&coordinates=" + latitude + "," + longitude + "&radius=" + radiusMeters + "&parameter=" + txt + "&value_from=" + valueFrom + "&value_to=" + valueTo + "&date_from=" + dateFrom + "&date_to=" + dateTo;
		//xhttp.open("GET", "https://api.openaq.org/v1/measurements?"+params, true);
		var params = "&coordinates=" + latitude + "," + longitude + "&radius=" + radiusMeters + "&parameter=" + txt;
		xhttp.open("GET", "https://api.openaq.org/v1/latest?"+params, true);
		xhttp.send();
	});
	
	/*
	document.getElementById("optionList").addEventListener('change', function(){
		var uluru = {lat: 44.96, lng: -93.26};
		map = new google.maps.Map(document.getElementById('map'), {
				zoom: 10,
				center: uluru,
				gestureHandling: 'greedy'
		});
	});
	*/	
	document.getElementById("latitude").addEventListener('change', function (){
		latitude = parseFloat(document.getElementById("latitude").value);
		longitude = parseFloat(document.getElementById("longitude").value);
		map.setCenter({lat:latitude, lng:longitude});
	});
	document.getElementById("longitude").addEventListener('change', function (){
		latitude = parseFloat(document.getElementById("latitude").value);
		longitude = parseFloat(document.getElementById("longitude").value);
		map.setCenter({lat:latitude, lng:longitude});
	});
	
	function addInfoWindow(marker, message) {
		var infoWindow = new google.maps.InfoWindow({
			content: message
		});

		google.maps.event.addListener(marker, 'click', function () {
			infoWindow.open(map, marker);
		});
	}
	
	map.addListener('click', function(event){
		var latitude = event.latLng.lat();
		var longitude = event.latLng.lng();
		var i = 0;
		var uluru = {lat: latitude, lng: longitude};
		var marker = new google.maps.Marker({
			position: uluru,
			map: map
		});
	/*	
		marker.addListener('mouseover', function() {
			infowindow.open(map, this);
		});

		marker.addListener('mouseout', function() {
			infowindow.close();
		});
		
	*/	
		geocodeLatLng(geocoder, map, infowindow, latitude, longitude);
		
		var xhttp = new XMLHttpRequest();
		xhttp.onreadystatechange = function() {
			if (this.readyState == 4 && this.status == 200) {
			   // Typical action to be performed when the document is ready:
			   console.log(xhttp.responseText);
			   var obj = JSON.parse(xhttp.responseText);
			   var table = document.getElementById("myTable");
			   
				if(obj.results[0] && obj.results[0].coordinates && obj.results[0].city && obj.results[0].measurements){
					row = table.insertRow(i);
					var cell = row.insertCell(0);
					cell.innerHTML = obj.results[0].city;
					cell = row.insertCell(1);
					cell.innerHTML = obj.results[0].coordinates.latitude;
					cell = row.insertCell(2);
					cell.innerHTML = obj.results[0].coordinates.longitude;
					cell = row.insertCell(3);
					//cell.innerHTML = obj.results[0].value;
					cell.innerHTML = obj.results[i].measurements[0].value;
					cell = row.insertCell(4);
					cell.innerHTML = obj.results[i].measurements[0].parameter;
					//cell.innerHTML = obj.results[0].parameter;
				}else{
					row = table.insertRow(i);
					var cell = row.insertCell(0);
					cell.innerHTML = "Unknown";
					cell = row.insertCell(1);
					cell.innerHTML = "Unknown";
					cell = row.insertCell(2);
					cell.innerHTML = "Unknown";
					cell = row.insertCell(3);
					cell.innerHTML = "Unknown";
					cell = row.insertCell(4);
					cell.innerHTML = "Unknown";
				}  
			}
		};
		
		//Chemical Options
		var sel = document.getElementById("optionList");
		var txt= sel.options[sel.selectedIndex].text;
		
		var valueFrom = document.getElementById("valueFrom").value;
		var valueTo = document.getElementById("valueTo").value;
		
		//var dateTo = new Date();
		//var n = dateTo.toISOString();
		var dateTo = document.getElementById("dateTo").value;
		var dateFrom = document.getElementById("dateFrom").value;
		
		//var params = "&coordinates=" + latitude + "," + longitude + "&parameter=" + txt + "&value_from=" + valueFrom + "&value_to=" + valueTo + "&date_from=" + dateFrom + "&date_to=" + dateTo;
		//xhttp.open("GET", "https://api.openaq.org/v1/measurements?"+params, true);
		var params = "&coordinates=" + latitude + "," + longitude + "&radius=" + radiusMeters + "&parameter=" + txt;
		xhttp.open("GET", "https://api.openaq.org/v1/latest?"+params, true);
		xhttp.send();
		i++;
	});
}

document.getElementById("optionList").addEventListener('change', function(){
	initMap();
});

function geocodeLatLng(geocoder, map, infowindow, latitude, longitude) {
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