var markers = [];
var map;
var directionsService;
var directionsDisplay;

$(document).on('ready',function(){
	//initMap();
	$('#drop').on('click', function(){
		var that = this;
		clearMarkers();
		$(this).text('Dropping Markers...');
		$(this).prop('disabled',true);
		var url = '/api/getPlots';
		$.ajax({
			type:'GET',
			url:url,
			success: function(data){
				$(that).prop('disabled',false);
				$(that).text('Drop Markers');
				var response = data.docs;
				drop(response);
			}
		});
	});

	$('#direction').on('click', function(){
//		clearMarkers();
		$.ajax({
			type:'GET',
			url:url,
			success: function(data){
				$(that).prop('disabled',false);
				$(that).text('Drop Markers');
				var response = data.docs;
				plotRoute(response);
			}
		});
	});

});

function initMap() {
	directionsService = new google.maps.DirectionsService;
	directionsDisplay = new google.maps.DirectionsRenderer;

	map = new google.maps.Map(document.getElementById('map'), {
	    zoom: 12,
	    center: {lat: 18.476351, lng: 73.890753}
	});
}

function drop(locations) {
  	clearMarkers();
	locations.forEach(function(location){
		addMarker(location);
	});
	//var redLocations = [];
	//if(locations.threshold >= 80){
	//redLocations.push(locations);
	//}
	plotRoute(locations);
}
function plotRoute(wayPoints){
	/*var origin = new google.maps.LatLng(wayPoints[0].lat,wayPoints[0].lng);
	var destination = new google.maps.LatLng(wayPoints[4].lat,wayPoints[4].lng);
	var waypoints = [];
	waypoints.push(new google.maps.LatLng(wayPoints[2].lat,wayPoints[2].lng));*/
	var _wps = [];
	_.each(wayPoints, function(wayPoint){
		_wps.push({
			lat:wayPoint.lat,
			lng:wayPoint.lng
		});
	});
//	var _wps = _.filter(wayPoints, function(wayPoint){ return {lat:wayPoint.lat,lng:wayPoint.lng} });
	
	var flightPath = new google.maps.Polyline({
    	path: _wps,
	    geodesic: true,
    	strokeColor: '#FFBFB0',
	    strokeOpacity: 1.0,
    	strokeWeight: 3
	});

  	flightPath.setMap(map);

}


function addMarker(positionDetails) {
	var redImage = "/images/marker.gif";
	var greenImage = "/images/green12.gif";

	var image = redImage;
	if(positionDetails.threshold < 80){
		image = greenImage;
	}

	var position = {
		lat:positionDetails.lat,
		lng:positionDetails.lng
	}

	

   	markers.push(new google.maps.Marker({
	  	position: position,
		map: map,
		animation: google.maps.Animation.DROP,
		icon : image
   	}));
}

function clearMarkers() {
	for (var i = 0; i < markers.length; i++) {
	  markers[i].setMap(null);
	}
	markers = [];
}

/*
function addMarkerWithTimeoutGreen(position, timeout) {
	var image1 = "/images/green12.gif";
	window.setTimeout(function() {
	    markers.push(new google.maps.Marker({
		    position: position,
    		map: map,
		    animation: google.maps.Animation.DROP,
			icon : image1
    	}));
	}, timeout);
}
*/


