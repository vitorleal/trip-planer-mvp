var maps = {

  map: null,
  center: {
    lat: 40.416691,
    lng: -3.700345
  },
  zoom: 13,

  init: function(lat, lng) {
    var latlng = new google.maps.LatLng(lat, lng),
        mapOptions  = {
          zoom: this.zoom,
          center: latlng,
          disableDefaultUI: true,
          zoomControl: true,
          zoomControlOptions: {
            style: google.maps.ZoomControlStyle.SMALL,
            position: google.maps.ControlPosition.TOP_RIGHT
          },
          mapTypeId: google.maps.MapTypeId.ROADMAP
        };

    this.map = new google.maps.Map(document.getElementById("map"), mapOptions);
    this.setMarker(latlng, this.map);
  },

  setMarker: function(latlng, map) {
    var marker = new google.maps.Marker({
        position: latlng,
        map: map,
        title: 'Hello World!',
        animation: google.maps.Animation.DROP
    });
  },

  setMarkers: function(markers, map) {

  },

  resize: function() {
    var w = $(window).width(),
        h = $(window).height();

    $('#map').width(w).height(h);
  }
}

//init map
$(function () {
  maps.resize();
	maps.init(maps.center.lat, maps.center.lng);
});

//resize map
$(window).resize(function () {
	maps.resize();
});