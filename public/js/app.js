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

	/*$('#direction').on('click', function(){
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
	});*/

});

function initMap() {
	directionsService = new google.maps.DirectionsService;
	directionsDisplay = new google.maps.DirectionsRenderer;
	 var infoWindow = new google.maps.InfoWindow();
     var lat_lng = new Array();
     var latlngbounds = new google.maps.LatLngBounds();

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
	plotRoute(locations);
	//var redLocations = [];
	//if(locations.threshold >= 80){
	//redLocations.push(locations);
	//}
	
	
}
function plotRoute(markers){
/*var mapOptions = {
            center: new google.maps.LatLng(markers[0].lat, markers[0].lng),
            zoom: 10,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        var map = new google.maps.Map(document.getElementById("map"), mapOptions);*/
        var infoWindow = new google.maps.InfoWindow();
        var lat_lng = new Array();
        var latlngbounds = new google.maps.LatLngBounds();
        for (i = 0; i < markers.length; i++) {
            var data = markers[i]
			if(data.threshold > 79){
				var myLatlng = new google.maps.LatLng(data.lat, data.lng);
				lat_lng.push(myLatlng);
			}
            
            var marker = new google.maps.Marker({
                position: myLatlng,
                map: map,
                title: data.title
            });
            latlngbounds.extend(marker.position);
            (function (marker, data) {
                google.maps.event.addListener(marker, "click", function (e) {
                    infoWindow.setContent(data.description);
                    infoWindow.open(map, marker);
                });
            })(marker, data);
        }
        map.setCenter(latlngbounds.getCenter());
        map.fitBounds(latlngbounds);
 
        //***********ROUTING****************//
 
        //Initialize the Path Array
        var path = new google.maps.MVCArray();
 
        //Initialize the Direction Service
        var service = new google.maps.DirectionsService();
 
        //Set the Path Stroke Color
        var poly = new google.maps.Polyline({ map: map, strokeColor: '#FF86E7' });
 
        //Loop and Draw Path Route between the Points on MAP
        for (var i = 0; i < lat_lng.length; i++) {
            if ((i + 1) < lat_lng.length) {
                var src = lat_lng[i];
                var des = lat_lng[i + 1];
                path.push(src);
                poly.setPath(path);
                service.route({
                    origin: src,
                    destination: des,
                    travelMode: google.maps.DirectionsTravelMode.DRIVING
                }, function (result, status) {
                    if (status == google.maps.DirectionsStatus.OK) {
                        for (var i = 0, len = result.routes[0].overview_path.length; i < len; i++) {
                            path.push(result.routes[0].overview_path[i]);
                        }
                    }
                });
            }
        }
	
}


function addMarker(positionDetails) {
	var redImage = "/images/marker.gif";
	var greenImage = "/images/green12.gif";
	var biogas ="/images/biogas.jpeg"
	var inorganic ="/images/recycle.jpeg"
	var recycle ="/images/inorganic.jpeg"
	var image2 ="/images/truck.png";

	var image = redImage;

	if(positionDetails.threshold < 80 ){
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
	//plotRoute(markers);
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


