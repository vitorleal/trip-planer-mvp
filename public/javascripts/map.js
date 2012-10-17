function initialize() {
  var latlng = new google.maps.LatLng(-34.397, 150.644),
  myOptions  = {
    zoom: 8,
    center: latlng,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  },
  map = new google.maps.Map(document.getElementById("map"), myOptions);
}

function resizeMap() {
	$('#map').width($(window).width()).height($(window).height());
}

$(function () {
	resizeMap();
	initialize();
});

$(window).resize(function () {
	resizeMap();
});