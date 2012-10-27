Array.prototype.chunk = function(chunkSize) {
    var array=this;
    return [].concat.apply([],
        array.map(function(elem,i) {
            return i%chunkSize ? [] : [array.slice(i,i+chunkSize)];
        })
    );
}


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
  placesArray: [],
  markersArray: [],
  daysArray: [],
  resultsArray: [],



  init: function(lat, lng) {
    var latlng  = new google.maps.LatLng(lat, lng),
    mapOptions  = {
      zoom: this.zoom,
      center: latlng,
      disableDefaultUI: true,
      zoomControl: true,
      zoomControlOptions: {
        style: google.maps.ZoomControlStyle.SMALL,
        position: google.maps.ControlPosition.TOP_LEFT
      },
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    this.map = new google.maps.Map(document.getElementById("map"), mapOptions);

    var request = {
      location: latlng,
      radius: '6000'
    },
    places = new google.maps.places.PlacesService(this.map),
    self   = this;

    places.search(request, function (results, status) {
      if (status === google.maps.places.PlacesServiceStatus.OK) {
        self.setMarkers(results);
      }
    });
  },



  setMarker: function(latlng, map, place) {
    var self = this,
    marker   = new google.maps.Marker({
        position: latlng,
        map: map,
        title: place.name,
        rate: place.rating,
        address: place.vicinity,
        id: place.id,
        animation: google.maps.Animation.DROP,
        icon: this.markers.blue,
        shadow: "images/pointer-shadow.png"
    });

    this.markersArray.push(marker);

    // click on marker
    google.maps.event.addListener(marker, 'click', function () {
      self.center.lat = marker.position.Xa;
      self.center.lng = marker.position.Ya;

      self.map.panTo(new google.maps.LatLng(marker.position.Ya, marker.position.Za));
      for (var i = 0, len = self.markersArray.length; i < len; i++) {
        self.markersArray[i].setIcon(self.markers.blue);
      }

      marker.setIcon(self.markers.red);
      marker.setZIndex(google.maps.Marker.MAX_ZINDEX + 1);
      // $('#showInfo h2').text(marker.title);
      // $('#showInfo .address').text(marker.address);
      // $('#showInfo .rate').text(marker.rate);

      $('.id-'+ marker.id).siblings().removeClass('text-error').end().addClass('text-error');
    });

    // dbclick on marker
    google.maps.event.addListener(marker, 'dblclick', function () {
      self.map.setZoom(16);
    });
  },



  setMarkers: function(results) {
    if (!this.resultsArray.length) {
      this.resultsArray = results;
    }
    var self = this;
    for (var i = 0; i < results.length; i++) {
      var place = results[i];
      self.setMarker(new google.maps.LatLng(place.geometry.location.Ya, place.geometry.location.Za), self.map, place);

      this.placesArray.push(place);
    }
  },



  clearMap: function() {
    for (var i = 0; i < this.markersArray.length; i++ ) {
      this.markersArray[i].setMap(null);
    }
    this.markersArray = [];
    this.placesArray  = [];
  },



  showDay: function (totalDays, day) {
    var pointsDays = maps.resultsArray.chunk(Math.ceil(maps.resultsArray.length/totalDays));

    this.daysArray = this.placesArray;
    this.clearMap();
    this.setMarkers(pointsDays[day]);

    $('#days-plan').html('');

    $.each(pointsDays[day], function (key, val) {
      $('#days-plan').append('<li class="id-'+ val.id +'"><h5>'+ val.name +'</h5><small class="muted">'+ val.vicinity +'</small></li>');
    });
  },



  resize: function() {
    var h   = $(window).height() - $('.navbar-fixed-top').height(),
        lat = this.center.lat,
        lng = this.center.lng;

    $('#map').height(h);

    if (this.map) {
      this.map.panTo(new google.maps.LatLng(lat, lng));
    }
  }
};



//init map
$(function () {
  var lat = $('#map').data('lat'),
      lng = $('#map').data('lng');

  maps.center.lat = lat;
  maps.center.lng = lng;

  maps.resize();
	google.maps.event.addDomListener(window, 'load', maps.init(lat, lng));


  //Click in the day and show the plan
  $('.days a').click(function () {
    var totalDays = $('.trip-days').text(),
        day       = $(this).data('day');

    if (!$(this).hasClass('disabled')) {
      maps.showDay(totalDays, day);
      $(this).siblings().removeClass('disabled').end().addClass('disabled');
    }
  });


  //Get list of friends
  $.getJSON('users/Madrid', function(users) {
    if (users) {
      $.each(users, function (key, val) {
        if(val.name !== $('.userName').text()) {
          $('#users').append('<div class="user">\
            <a href="#" rel="popover" data-original-title="'+ val.name +'" data-content="'+ val.name.split(' ')[0] +' lives here! '+ val.email +'" data-trigger="hover">\
              <img class="img-polaroid" src="http://graph.facebook.com/'+ val.facebook_id +'/picture?type=small"/>\
            </a>\
          </div>');
        }
      });

      $('.user a').popover();
      $('#users').delay(1500).fadeIn();
    }
  });

  //save places in the database
  // $.each(maps.placesArray, function (key, place) {
  //   $.post("/points", { city: "Madrid", title: place.name, address: place.vicinity, latlng: place.geometry.location.Ya +','+ place.geometry.location.Za } );
  // });


});

//resize map
$(window).resize(function () {
	maps.resize();
});