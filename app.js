window.LRM = {
	tileLayerUrl: 'https://tile.openstreetmap.org/{z}/{x}/{y}.png'
};

var map = L.map('map', { scrollWheelZoom: true}).setView([45.763420, 4.834277], 12);
var baseAddress = "http://gateway-optimusbus.router.default.svc.cluster.local/optimusbus/";
var standingPoints;
var pickupPoints;
var vehicles;
var bookings;
var associations;
var associations1;
var allPointsGroup;
var routingControl;
var positionGroup;
var vehicleGroup;
var bookingsGroup;
var associationsGroup;
var pickupPointsGroup;
var standingPointsGroup;
var currentRoute;
var supportVehicle;
var thisVehicle;
var thisStanding;
var thisRoute;

$(document).ready(function(){
	$.get(baseAddress + "roadnetwork/standingpoint", function(res){
		standingPoints = res;
	});
	$.get(baseAddress + "roadnetwork/pickuppoint", function(res){
		pickupPoints = res;
	});
	/*
	$.get("cluster/vehicles.js", function(res){
		vehicles = JSON.parse(res);
	});
	$.get("cluster/bookings.js", function(res){
		bookings = JSON.parse(res);
	});
	$.get("cluster/ass.js", function(res){
		associations = JSON.parse(res);
	});
	$.get("cluster/ass1.js", function(res){
		associations1 = JSON.parse(res);
	});
	*/
	L.tileLayer(LRM.tileLayerUrl, {
		attribution: '<font class="attribution">OptimusBus</font>'
	}).addTo(map);
	routingControl = createRoutingControl();
	routingControl.addTo(map);
	allPointsGroup = L.layerGroup().addTo(map);
	positionGroup = L.layerGroup().addTo(map);
	vehicleGroup = L.layerGroup().addTo(map);
	bookingsGroup = L.layerGroup().addTo(map);
	associationsGroup = L.layerGroup().addTo(map);
    standingPointsGroup = L.layerGroup().addTo(map);
    pickupPointsGroup = L.layerGroup().addTo(map);
    currentRoute = L.layerGroup().addTo(map);
});

function startRouteReq(){
	setInterval(sendRouteRequest, 180000);
}

function logMe(){
	showLoader();
	let us = $('.username-login-box').val();
	let pw = $('.password-login-box').val();
	let s = new Object();
	s.username = us;
	s.password = pw;
	let url = baseAddress + 'security/authVehicle';
	let jsonString = JSON.stringify(s);
	$.ajax({
		data : jsonString,
		contentType : 'application/json',
    	type : 'POST',
		url: url
	}).done(function(data, textStatus, xhr){
		vehicleId = data.vehicleId;
		getVehicle(vehicleId);
		hideLogin();
	}).fail(function(){
		$('.login-response').html("Invalid Username/Password");
	}).always(function(){
		hideLoader();
	});
}

function getVehicle(id){
	let url = baseAddress + 'vehicles/'+id;
	$.ajax({
    	contentType : 'application/json',
    	type : 'GET',
		url: url
	}).done(function(data, textStatus, xhr){
		thisVehicle = data;
		getSingleLocation(parseInt(thisVehicle.standingPoint));
		fillGui();
		startRouteReq();
	}).fail(function(){
		console.log("vehicle not found");
	}).always(function(){
		
	});
}

function getSingleLocation(osmid){
	let url = baseAddress + 'roadnetwork/' + osmid;
	$.ajax({
    	contentType : 'application/json',
    	type : 'GET',
		url: url
	}).done(function(data, textStatus, xhr){
		thisStanding = data;
	}).fail(function(){
		console.log("node not found");
	}).always(function(){
		
	});
}

function fillGui(){
	$('.vehicleid-box').html(thisVehicle.vehicleId);
	$('.vehiclestatus-box').html(thisVehicle.state);
	$('.occupancy-box').html(thisVehicle.currentOccupancy);
}

function showThisStanding(){
	let element = thisStanding;
	let tit = element.location.latitude + " " + element.location.longitude + " " + element.nodeId;
	let popup = thisVehicle.vehicleId + "<br>Pickup Point:<br>" + element.nodeId + "<br" + element.location.latitude + " " + element.location.longitude;
	L.marker([element.location.latitude, element.location.longitude], {icon: standingPointIcon, title: tit}).bindPopup(popup).addTo(standingPointsGroup);
	map.fitBounds([[element.location.latitude, element.location.longitude], [element.location.latitude, element.location.longitude]]);
}

function collapseMenu(){
	if($('.vehicle-collapse').is(":visible")) $('.vehicle-collapse').hide();
	else $('.vehicle-collapse').show();
}

function hideLogin(){
	$('.login-overlay').hide();
}

function showLoader(){
	$('.loader-wrapper').show();
}

function hideLoader(){
	$('.loader-wrapper').hide();
}

function clearGui(){
    positionGroup.clearLayers();
    vehicleGroup.clearLayers();
    bookingsGroup.clearLayers();
    associationsGroup.clearLayers();
    standingPointsGroup.clearLayers();
    pickupPointsGroup.clearLayers();
    map.fitBounds([[45.5176331, 5.1322809], [45.98289006, 4.6349013]]);
}

function clearPickupPoints(){
    pickupPointsGroup.clearLayers();
}

function clearStandingPoints(){
    standingPointsGroup.clearLayers();
}

function showAllMarks(){
	standingPoints.forEach(element => {
		let tit = element.location.latitude + " " + element.location.longitude + " " + element.osmid;
		L.marker([element.location.latitude, element.location.longitude], {icon: standingPointIcon, title: tit}).addTo(standingPointsGroup);
	});
	pickupPoints.forEach(element => {
		let tit = element.location.latitude + " " + element.location.longitude + " " + element.osmid;
		L.marker([element.location.latitude, element.location.longitude], {icon: pickupPointIcon, title: tit}).addTo(pickupPointsGroup);
	});
	map.fitBounds([[45.5176331, 5.1322809], [45.98289006, 4.6349013]]);
}

function showAllPickups(){
    if(pickupPointsGroup.getLayers().length > 0){
        clearPickupPoints();
        return false;
    }
    pickupPoints.forEach(element => {
		let tit = element.location.latitude + " " + element.location.longitude + " " + element.osmid;
        let popup = "Pickup Point:<br>" + element.osmid;
		L.marker([element.location.latitude, element.location.longitude], {icon: pickupPointIcon, title: tit}).bindPopup(popup).openPopup().addTo(pickupPointsGroup);
	});
    map.fitBounds([[45.5176331, 5.1322809], [45.98289006, 4.6349013]]);
}

function showAllStandings(){
    if(standingPointsGroup.getLayers().length > 0){
        clearStandingPoints();
        return false;
    }
    standingPoints.forEach(element => {
		let tit = element.location.latitude + " " + element.location.longitude + " " + element.osmid;
        let popup = "Standing Point:<br>" + element.osmid;
		L.marker([element.location.latitude, element.location.longitude], {icon: standingPointIcon, title: tit}).bindPopup(popup).openPopup().addTo(standingPointsGroup);
	});
    map.fitBounds([[45.5176331, 5.1322809], [45.98289006, 4.6349013]]);
}

function showCurrentPosition(){
    positionGroup.clearLayers();
	let position = calculatePosition();
	L.marker(position, {icon: positionIcon, title: "Io", zIndexOffset: 1000}).bindPopup("Posizione Corrente").openPopup().addTo(positionGroup);
	let waypoints = [L.latLng(position)];
	let bounds = calcBounds(waypoints);
	let p1 = bounds[0];
	let p2 = bounds[1];
	map.fitBounds([[p1.x, p1.y], [p2.x, p2.y]]);
}

function showAllVehicles(){
	vehicles.forEach(element => {
		let tit = element.vehicleId + "<br>" + element.location.latitude + " " + element.location.longitude;
		L.marker([element.location.latitude, element.location.longitude], {icon: gold, zIndexOffset: 999}).bindPopup("Veicolo<br>" + tit).openPopup().addTo(vehicleGroup);
	});
}

function showAllBookingsDeparture(){
	bookings.forEach(element => {
		let node = getNodeById(element.departure);
		let tit = element.passengerId + "<br>" + element.departure + "<br>" + node.coordinate.latitude + " " + node.coordinate.longitude;
		L.marker([node.coordinate.latitude, node.coordinate.longitude], {icon: gold, zIndexOffset: 999}).bindPopup("Partenza<br>" + tit).openPopup().addTo(bookingsGroup);
	});
}

function showAllBookingsDestination(){
	bookings.forEach(element => {
		let node = getNodeById(element.destination);
		let tit = element.passengerId + "<br>" + element.destination + "<br>" + node.coordinate.latitude + " " + node.coordinate.longitude;
		L.marker([node.coordinate.latitude, node.coordinate.longitude], {icon: grey, zIndexOffset: 999}).bindPopup("Arrivo<br>" + tit).openPopup().addTo(bookingsGroup);
	});
}

function showAllAssociations(){
	let x = 0;
	associations.forEach(element => {
		x++;
		let vehicle = getVehicleById(element.vehicleId);
		let ic = icons[x];
		let dep = element.departures;
		let tit1 = element.vehicleId + "<br>" + vehicle.location.latitude + " " + vehicle.location.longitude;
		L.marker([vehicle.location.latitude, vehicle.location.longitude], {icon: ic, zIndexOffset: 999}).bindPopup("Veicolo<br>" + tit1).openPopup().addTo(associationsGroup);
		let vid = element.vehicleId;
		dep.forEach(element => {
			let node = getNodeById(element);
			let tit = element + "<br>" + vid + "<br>" + node.coordinate.latitude + " " + node.coordinate.longitude;
			L.marker([node.coordinate.latitude, node.coordinate.longitude], {icon: ic, zIndexOffset: 998}).bindPopup("Arrivo<br>" + tit).openPopup().addTo(associationsGroup);
		});
	});
}

function showAllAssociations1(){
	let x = 0;
	associations1.forEach(element => {
		x++;
		let vehicle = getVehicleById(element.vehicleId);
		let ic = icons[x];
		let dep = element.departures;
		let tit1 = element.vehicleId + "<br>" + vehicle.location.latitude + " " + vehicle.location.longitude;
		L.marker([vehicle.location.latitude, vehicle.location.longitude], {icon: ic, zIndexOffset: 999}).bindPopup("Veicolo<br>" + tit1).openPopup().addTo(associationsGroup);
		dep.forEach(element => {
			let node = getNodeById(element);
			let tit = element + "<br>" + node.coordinate.latitude + " " + node.coordinate.longitude;
			L.marker([node.coordinate.latitude, node.coordinate.longitude], {icon: ic, zIndexOffset: 998}).bindPopup("Arrivo<br>" + tit).openPopup().addTo(associationsGroup);
		});
	});
}

function getDepartureList(dep){
	let l = [];
	for(i = 0; i <= dep.length; i++)
		l.push(dep[i]);
	return l;
}

function calcIcon(id){
	let n = id.slice(-1);
	return icons[parseInt(n)];
}

function getNodeById(id){
	return pickupPoints.find(element => element.osmid == id)
}

function getVehicleById(id){
	return vehicles.find(element => element.vehicleId == id)
}

function clearAllMarks(){
	allPointsGroup.clearLayers();
}

function clearRoute(){
	routingControl.setWaypoints();
}

function calcBounds(waypoints){
	// x: latitude y: longitude
	let p1 = {x: 0, y: 0}; // x: min y: max
	let p2 = {x: 0, y: 0}; // x: max y: min
	let bounds = [];
	p1.x = waypoints[0].lat;
	p2.x = waypoints[0].lat;
	p1.y = waypoints[0].lng;
	p2.y = waypoints[0].lng;
	waypoints.forEach(element => {
		if(element.lat < p1.x) p1.x = element.lat;
		else if(element.lat > p2.x) p2.x = element.lat;
		if(element.lng > p1.y) p1.y = element.lng;
		else if(element.lng < p2.y) p2.y = element.lng;
	});
	bounds.push(p1);
	bounds.push(p2);
	return bounds;
}

function calculatePosition(){
	return [thisVehicle.location.latitude, thisVehicle.location.longitude];
}

function testMark(){
	let waypoints = [L.latLng([45.6174881, 4.7505543]),
					L.latLng([45.9761659, 4.6982373]),
					L.latLng([45.6540969, 5.0962576]),
					L.latLng([45.7606675, 4.8358755])];
	let bounds = calcBounds(waypoints);
	let p1 = bounds[0];
	let p2 = bounds[1];
	routingControl.setWaypoints(waypoints);
	map.fitBounds([[p1.x, p1.y], [p2.x, p2.y]]);
}

function showRoute(){
	routingControl.setWaypoints();
	let waypoints = [];
	let route = thisRoute.route;
	Object.entries(route).forEach(function(e){ 
		element = e[1];
		waypoints.push(L.latLng([element.location.latitude, element.location.longitude]));
	});
	let bounds = calcBounds(waypoints);
	let p1 = bounds[0];
	let p2 = bounds[1];
	routingControl.setWaypoints(waypoints);
	map.fitBounds([[p1.x, p1.y], [p2.x, p2.y]]);
}

function createRoutingControl(){
	// 0 STANDING POINT
	// 1 PICKUP POINT
	// 2 TRANSITION
	return L.Routing.control({
		router: L.Routing.mapbox('pk.eyJ1Ijoic2Vuc2VsZXNzbWl0ZSIsImEiOiJja3VmbTY0MjcxZXM1MnFtdHYwdW8zZnlmIn0.ou1Jnfl5Yrx60E9aQHNfsg'),
		useZoomParameter: true,
		routeWhileDragging: false,
		createMarker: function(i, wp) {
			let x = i + 1;
			return L.marker(wp.latLng, {
				icon: L.icon.glyph({ glyph: x, iconUrl: "/optimusbus/VehicleClient/assets/waypoint.png", glyphColor: 'black', glyphSize: '20px' })
			}).bindPopup("Pickup Point, Waypoint numero: " + x).openPopup();
		}
	});
}

function sendSupportRequest(message=false){
	showLoader();
	let id = thisVehicle.vehicleId;
	let url = baseAddress + 'vehicles/support?vehicleId=' + id;
	var l = new XMLHttpRequest(); 
	l.open("GET", url); 
	var readyStateChange = function(){
		if (l.readyState == 4) {
			hideLoader();
			if(message){
				createMessage("Failure Request", "Request sent, Vehicle " + l.responseText + " is coming");
				$('.message-box').find('.button-confirm').on("click", function(){
					$('.message-box').hide();
					$('.message-box').find('.button-confirm').off("click")
					$('.message-box').find('.button-discard').off("click")
				});
			}
			if(!message){
				createMessage("Support request", "Vehicle " + l.responseText + " is coming");
				$('.message-box').find('.button-confirm').on("click", function(){
					$('.message-box').hide();
					$('.message-box').find('.button-confirm').off("click")
					$('.message-box').find('.button-discard').off("click")
				});
			}
		}else{
			hideLoader();
		}
	};
	l.onload = readyStateChange;
	l.send();
}

function sendRouteRequest(){
	showLoader();
	let id = thisVehicle.vehicleId;
	let url = baseAddress + 'vehicles/getRoute?vehicleId=' + id;
	$.ajax({
    	contentType : 'application/json',
    	type : 'GET',
		url: url
	}).done(function(data, textStatus, xhr){
		hideLoader();
		thisRoute = data;
		showRoute();
	}).fail(function(){
		hideLoader();
		return false;
	}).always(function(){
		hideLoader();
	});
}

function sendFailureRequest(){
	showLoader();
	let id = thisVehicle.vehicleId;
	let url = baseAddress + 'vehicles/failure?vehicleId=' + id;
	$.ajax({
    	contentType : 'application/json',
    	type : 'GET',
		url: url
	}).done(function(){
		sendSupportRequest(true);
	}).fail(function(){
		hideLoader();
		return false;
	}).always(function(){
		
	});
}

function confirmBooking(id, code){
	showLoader();
	let s = new Object();
	s.bookingId = id;
	s.code = code;
	let url = baseAddress + 'bookings/confirm';
	let jsonString = JSON.stringify(s);
	$.ajax({
		data : jsonString,
		contentType : 'application/json',
    	type : 'POST',
		url: url
	}).done(function(data, textStatus, xhr){
		createMessage("Code Request", "Code Sent: " + data);
		$('.message-box').find('.button-confirm').on("click", function(){
			$('.message-box').hide();
			$('.message-box').find('.button-confirm').off("click")
			$('.message-box').find('.button-discard').off("click")
		});		
	}).fail(function(){
		hideLoader();
		return false;
	}).always(function(){
		hideLoader();
		return false;
	});
}

function createCodeMessage(){
    createMessage("Insert Code", "Booking Code", true, true);
    $('.message-box').find('.button-confirm').on("click", function(){
        let code = $('.message-box').find('.code-input').val();
        let id = $('.message-box').find('.booking-input').val();
        confirmBooking(id, code);
    });
    $('.message-box').find('.button-discard').on("click", function(){
        console.log("discarded");
        $('.message-box').find('.button-discard').hide();
        $('.message-box').hide();
        $('.message-box').find('.button-confirm').off("click")
        $('.message-box').find('.button-discard').off("click")
    });
}

function createFailureMessage(){
    createMessage("Failure Request", "Send failure request to the system?", true);
    $('.message-box').find('.button-confirm').on("click", function(){
        sendFailureRequest();
    });
    $('.message-box').find('.button-discard').on("click", function(){
        console.log("discarded");
        $('.message-box').find('.button-discard').hide();
        $('.message-box').hide();
        $('.message-box').find('.button-confirm').off("click")
        $('.message-box').find('.button-discard').off("click")
    });
}

function createMessage(title, text, discard=false, input=false){
    $('.message-box').find('.box-title').html(title);
    $('.message-box').find('.box-text').html(text);
    $('.message-box').find('.button-confirm').html("Ok");
    $('.message-box').find('.message-input').val("");
    if(discard){
        $('.message-box').find('.button-discard').html("Cancel");
        $('.message-box').find('.button-discard').show();
    }else{
        $('.message-box').find('.button-discard').html("");
        $('.message-box').find('.button-discard').hide();
    }
    if(input){
        $('.message-box').find('.box-message-input').show();
        $('.message-box').find('.message-input').show();
    }else{
        $('.message-box').find('.box-message-input').hide();
        $('.message-box').find('.message-input').hide();
    }
    $('.message-box').show();
}
