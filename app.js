window.LRM = {
	tileLayerUrl: 'https://tile.openstreetmap.org/{z}/{x}/{y}.png'
};

var map = L.map('map', { scrollWheelZoom: true}).setView([45.763420, 4.834277], 12);
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

$(document).ready(function(){
	$.get("data/stdp.js", function(res){
		standingPoints = JSON.parse(res);
	});
	$.get("data/pckp.js", function(res){
		pickupPoints = JSON.parse(res);
	});
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
		let tit = element.coordinate.latitude + " " + element.coordinate.longitude + " " + element.osmid;
		L.marker([element.coordinate.latitude, element.coordinate.longitude], {icon: standingPointIcon, title: tit}).addTo(standingPointsGroup);
	});
	pickupPoints.forEach(element => {
		let tit = element.coordinate.latitude + " " + element.coordinate.longitude + " " + element.osmid;
		L.marker([element.coordinate.latitude, element.coordinate.longitude], {icon: pickupPointIcon, title: tit}).addTo(pickupPointsGroup);
	});
	map.fitBounds([[45.5176331, 5.1322809], [45.98289006, 4.6349013]]);
}

function showAllPickups(){
    if(pickupPointsGroup.getLayers().length > 0){
        clearPickupPoints();
        return false;
    }
    pickupPoints.forEach(element => {
		let tit = element.coordinate.latitude + " " + element.coordinate.longitude + " " + element.osmid;
        let popup = "Pickup Point:<br>" + element.osmid;
		L.marker([element.coordinate.latitude, element.coordinate.longitude], {icon: pickupPointIcon, title: tit}).bindPopup(popup).openPopup().addTo(pickupPointsGroup);
	});
    map.fitBounds([[45.5176331, 5.1322809], [45.98289006, 4.6349013]]);
}

function showAllStandings(){
    if(standingPointsGroup.getLayers().length > 0){
        clearStandingPoints();
        return false;
    }
    standingPoints.forEach(element => {
		let tit = element.coordinate.latitude + " " + element.coordinate.longitude + " " + element.osmid;
        let popup = "Standing Point:<br>" + element.osmid;
		L.marker([element.coordinate.latitude, element.coordinate.longitude], {icon: standingPointIcon, title: tit}).bindPopup(popup).openPopup().addTo(standingPointsGroup);
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
	return [45.6174881, 4.7505543];
}

function testMark(){
	let waypoints = [L.latLng([45.6174881, 4.7505543, 0]),
					L.latLng([45.9761659, 4.6982373, 1]),
					L.latLng([45.6540969, 5.0962576, 0]),
					L.latLng([45.7606675, 4.8358755, 2])];
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
			if(wp.latLng.alt === 0){
				return L.marker(wp.latLng, {
					icon: standingPointIcon
				}).bindPopup("Standing Point, Waypoint numero: " + i).openPopup();
			} else if(wp.latLng.alt === 1){
				return L.marker(wp.latLng, {
					icon: pickupPointIcon
				}).bindPopup("Pickup Point, Waypoint numero: " + i).openPopup();
			}else if(wp.latLng.alt === 2){
				return L.marker(wp.latLng, {
					icon: transitionIcon
				}).bindPopup("Transition Point, Waypoint numero: " + i).openPopup();
			}else{
				return L.marker(wp.latLng, {
					icon: purple
				}).bindPopup("Pickup Point, Waypoint numero: " + i).openPopup();
			}
		}
	});
}

function createCodeMessage(){
    createMessage("Insert Code", "Booking Code", true, true);
    $('.message-box').find('.button-confirm').on("click", function(){
        let code = $('.message-box').find('.code-input').val();
        let id = $('.message-box').find('.booking-input').val();
        console.log("sending code request: ", id, code);
        $('.message-box').find('.button-confirm').off("click")
        $('.message-box').find('.button-discard').off("click")
        createMessage("Code Request", "Code Sent: RESPONSE");
        $('.message-box').find('.button-confirm').on("click", function(){
            $('.message-box').hide();
            $('.message-box').find('.button-confirm').off("click")
            $('.message-box').find('.button-discard').off("click")
        });
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
        console.log("sending failure request");
        $('.message-box').find('.button-confirm').off("click")
        $('.message-box').find('.button-discard').off("click")
        createMessage("Failure Request", "Request sent, Vehicle " + supportVehicle + " is coming");
        $('.message-box').find('.button-confirm').on("click", function(){
            $('.message-box').hide();
            $('.message-box').find('.button-confirm').off("click")
            $('.message-box').find('.button-discard').off("click")
        });
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
