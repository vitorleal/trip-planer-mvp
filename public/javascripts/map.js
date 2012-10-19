var maps = {

  map: null,
  center: {
    lat: 40.416691,
    lng: -3.700345
  },
  markers: {
    blue: "images/pointer-blue.png",
    red: "images/pointer-red.png",
    green: "images/pointer-green.png"
  },
  zoom: 14,

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
        animation: google.maps.Animation.DROP,
        icon: this.markers.blue,
        shadow: "images/pointer-shadow.png"
    });
  },

  setMarkers: function(markers, map) {

  },

  resize: function() {
    var w = $(window).width() - $('.side-map').width(),
        h = $(window).height() - $('.navbar-fixed-top').height();

    $('#map').height(h);

    if (this.map) {
      var lat = $('#map').data('lat'),
          lng = $('#map').data('lng');

      this.map.panTo(new google.maps.LatLng(lat, lng));
    }
  }
}

//init map
$(function () {
  var lat = $('#map').data('lat'),
      lng = $('#map').data('lng');

  maps.resize();
	maps.init(lat, lng);
});

//resize map
$(window).resize(function () {
	maps.resize();
});