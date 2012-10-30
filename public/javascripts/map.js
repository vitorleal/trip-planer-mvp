Array.prototype.chunk = function(chunkSize) {
    var array=this;
    return [].concat.apply([],
        array.map(function(elem,i) {
            return i%chunkSize ? [] : [array.slice(i,i+chunkSize)];
        })
    );
}


var maps = {

  days: [
    [
      {
        "title": "Hotel Victoria",
        "description": "This historic hotel is in the heart of Madrid, by the Puerta del Sol. Facilities include free Wi-Fi and a café-bar on the large outdoor terrace. The Hotel Victoria 4 dates back to 1850 and offers elegant, renovated interiors. Rooms at Victoria 4 are soundproofed, with a free safety deposit box. They all offer a spacious bathroom with a bathtub and hairdryer. Continental breakfast is included in rates. There is a traditional restaurant and a range of tapas are on offer at the Café del Levante. Sol Metro Station is metres away and offers easy transport around the city. Victoria 4 is in a lively area, within walking distance of Gran Vía and the Art Triangle.",
        "geo": {
          "lat": "40.416204",
          "lng": "-3.701728"
        },
        "address": "Victoria, 4, Centro, 28012 Madrid"
      },
      {
        "title": "La Puerta del Sol",
        "description": "Sun Gate (Puerta del Sol) is the most popular and commercial area in the old town. Five hundred years ago it was just another city gate with an image of the sun drawn on it, hence its name. Nowadays, the square is famous for being the center of the national road network. The plaque on the pavement outside the old Post Office building denotes 'kilometer 0'. The distance between Madrid and every other part of Spain is measured from here. Thousands of revelers gather in the square once a year to await the chimes of the clock that officially announces the New Year. Open 24 hours",
        "geo": {
          "lat": "40.416876",
          "lng": "-3.703305"
        },
        "address": "C. Mayor / C. Alcala, 28013 Madrid, 28013, Madrid, Spain"
      },
      {
        "title": "Mercado San Miguel",
        "description": "Diseñado por el arquitecto Alfonso Dubé y Díez, fue inaugurado el 13 de mayo de 1916, ahora totalmente reformado bajo la dirección de Juan Manuel Alarcón, acoge todo cuanto quieras comer, y donde quieras degustarlo en el interior mágico de su hermosa estructura de hierro cristal y cerámica levedad y color; productos de la tierra o de la mar. Allí encontrarás un descanso en el camino, y te podrás relacionar con gentes de toda condición y de múltiples países. Allí según la hora del día podrás degustar un buen vino de Rioja o un buen jamón de bellota, a otra hora del día podrás desayunar excelente bollería si vas a primera hora del día. Es el Gastródomo de San Miguel ¡olé al tapeo madrileño!",
        "geo": {
          "lat": "40.41612634593848",
          "lng": "-3.7069737911224365"
        },
        "address": "Plaza de San Miguel, s/n, 28005, Madrid, Spainn"
      },
      {
        "title": "La latina (Calle Cava Baja)",
        "description": "La Cava Baja es una de las principales calles del barrio de La Latina, y actualmente muy conocida por sus múltiples lugares de tapas, tabernas y magníficos restaurantes. Es muy frecuentada los domingos después del rastro por madrileños y turistas. El origen de la Cava Alta y de la Cava Baja está en los antiguos fosos que se situaban en el exterior de la muralla para evitar los asaltos por sorpresa. Estas antiguas cavas permitían la entrada o salida aunque estuvieran echadas las puertas, inclusive cuenta la leyenda, se fugaron gran parte de los árabes cuando Alfonso VI reconquistó Madrid. La Cava Baja discurre desde la plaza de Puerta Cerrada hasta la plaza del Humilladero. En esta calle se establecieron la mayoría de las fondas, tabernas y hospederías que recibían y albergaban a los vendedores que llegaban desde Castilla a vender sus mercancías en los mercados de la Cebada o de San Miguel. Tuvieron su origen en el siglo XVII y en un principio sólo daban alojamiento al viajero y a su caballería. El negocio de las posadas motivó la proliferación de talleres artesanos con los que comerciaban estos vendedores. Actualmente quedan cinco de las antiguas posadas, aunque ya no se dediquen a su función original: San Isidro, el Dragón, El León de Oro, la de San Pedro (Mesón del Segoviano) y la posada de la Villa. Entre los establecimientos actuales destaca Casa Lucio (Cava Baja, 35), el famosísimo restaurante que abrió sus puertas en 1974 y que es famoso por sus huevos estrellados.",
        "geo": {
          "lat": "40.416469420475956",
          "lng": "-3.709259033203125"
        },
        "address": "Calle Cava Baja 28005 Madrid, Spain"
      },
      {
        "title": "Shoko discotheque",
        "description": "Músic: Mix, to dance and house | Dress Code: Smart Casual, dress shoes | Age: between 18 and 32",
        "geo": {
          "lat": "40.40943604281766",
          "lng": "-3.708261251449585"
        },
        "address": "Calle de Toledo, 86, 28005 Madrid, Spain"
      }
    ],

    [
      {
        "title": "Hotel Victoria",
        "description": "This historic hotel is in the heart of Madrid, by the Puerta del Sol. Facilities include free Wi-Fi and a café-bar on the large outdoor terrace. The Hotel Victoria 4 dates back to 1850 and offers elegant, renovated interiors. Rooms at Victoria 4 are soundproofed, with a free safety deposit box. They all offer a spacious bathroom with a bathtub and hairdryer. Continental breakfast is included in rates. There is a traditional restaurant and a range of tapas are on offer at the Café del Levante. Sol Metro Station is metres away and offers easy transport around the city. Victoria 4 is in a lively area, within walking distance of Gran Vía and the Art Triangle.",
        "geo": {
          "lat": "40.416204",
          "lng": "-3.701728"
        },
        "address": "Victoria, 4, Centro, 28012 Madrid"
      },
       {
        "title": "Plaza Mayor",
        "description": "There are many ways to spend your time and money at this attractive central square: stroll around and admire the architecture and the murals or even buy an original watercolor from one of the many pavement artists. During the Middle Ages, merchants congregated here to live and sell their wares. When Felipe II established the Court in Madrid, he decided that this square should be reserved for special occasions, and it started to take its present shape from 1790 onwards. The statue in the center is of Felipe III.",
        "geo": {
          "lat": "40.42408195771912",
          "lng": "-3.7067699432373047"
        },
        "address": "Plaza Mayor, 30 28012 Madrid, Spain"
      },
       {
        "title": "Plaza España",
        "description": "You just have to look at the number of people lying on the grass alongside the fountains or resting on the park benches to know this is a popular spot. The most prominent feature is the statue dedicated to Spain's most famous writer, Miguel de Cervantes, that depicts his two principal characters - Don Quijote and Sancho Panza. At Christmas time, the area towards Calle Princesa fills with stalls selling all types of gifts and decorative objects. You can't help but notice the two enormous mid-20th-century skyscrapers here: El Edificio España and La Torre de Madrid.",
        "geo": {
          "lat": "40.42764289183605",
          "lng": "-3.7132930755615234"
        },
        "address": "Plaza de España, Madrid, Spain"
      },
       {
        "title": "Calle Gran Vía",
        "description": "Is an ornate and upscale shopping street located in central Madrid. It leads from Calle de Alcalá, close to Plaza de Cibeles, to Plaza de España. The lively street is one of the city's most important shopping areas, with a large number of hotels and large movie theaters; it is also noted for the grand architecture prevalent among many of its buildings. Now, most of the theaters are being replaced by shopping malls. It is considered a showcase of early 20th century architecture, with patterns ranging from Vienna Secession style, Plateresque, Neo-Mudéjar, Art Deco and others",
        "geo": {
          "lat": "40.42421263753269",
          "lng": "-3.703465461730957"
        },
        "address": "Calle Gran Vía, Madrid, Spain"
      },
       {
        "title": "Fuente de Cibeles",
        "description": "Another majestic work of art commissioned by King Carlos III to ennoble the city. This time his architects chose to create an image in white stone of the goddess Cibeles (La Fuente de Cibeles) driving a carriage drawn by lions. Ventura Rodríguez came up with the design while Roberto Michel and Francisco Gutierrez carried out the work. It's surrounded by some of the city's most important historic buildings and it has become a favorite symbolic landmark for madrileños. The fans of Real Madrid football club gather here to celebrate their team's victories.",
        "geo": {
          "lat": "40.42761022357258",
          "lng": "-3.6931228637695312"
        },
        "address": "Plaza de Cibeles, 28014 Madrid, Spain"
      },
      {
        "title": "Banco de España",
        "description": "The Spanish Central Bank headquarters houses a valuable art collection that includes the work of artists like Goya, Salvador Maella, Sorolla, and Zuloaga, as well as luxurious wall-hangings and antique furniture. The interior patio is used as a library and the beautiful staircase is made of Carrara marble. It occupies one of the best locations in Madrid, at major crossroads linking Plaza de Cibeles with Calle Alcalá, Gran Vía, and the Paseo del Prado. After opening in 1889, it had to be expanded in 1936 and then again in 1975. The three distinct façades display diverse architectural styles. For admission, write to the Servicio de Protocolo at the bank's address, or call.",
        "geo": {
          "lat": "40.42016144525906",
          "lng": "-3.69415283203125"
        },
        "address": "Calle de Alcalá, 48, 28014 Madrid, Spain"
      },
      {
        "title": "Puerta de Alcalá",
        "description": "One of Madrid's enduring symbols, it's made entirely of granite with one central arch and two smaller passageways on each side. Carlos III had his Court architect Sabatini build the gate in 1778 as a monument to himself and to show visiting merchants from Aragon how important the city had become. The ornamental statues are the work of Roberto Michel and Francisco Gutierrez. Its location is spectacular, as it stands on raised ground opposite another symbol of the city, Cibeles Fountain .",
        "geo": {
          "lat": "40.42243210323737",
          "lng": "-3.6884236335754395"
        },
        "address": "Puerta de Alcalá, Madrid, Spain"
      },
      {
        "title": "El Parque del Retiro",
        "description": "This park is known as the 'lungs of Madrid,' and few cities can boast such a large park in such a central location. There's a large boating lake and three art galleries (Casa de Vacas, Palacio de Cristal and Palacio de Velázquez). On weekends and holidays, it fills with madrileños (citizens of Madrid) and performers of all sorts, including mime artists and jugglers, painters, singers, puppet masters and fortune-tellers. It was built as a royal park in the 17th Century, and until 1868 it was the exclusive reserve of the aristocracy.",
        "geo": {
          "lat": "40.425911452005714",
          "lng": "-3.689088821411133"
        },
        "address": "Calle de Alfonso XII, 14, 28014 Madrid, Spain"
      },
      {
        "title": "Estadio Santiago Bernabeu - Game",
        "description": "Spanish League | Real Madrid Vs Zaragoza",
        "geo": {
          "lat": "40.453109",
          "lng": "-3.6879969999999958"
        },
        "address": "Av de Concha Espina, 1, 28036 Madrid, Spain"
      },
      {
        "title": "Mercado de San Anton",
        "description": "Located in the heart of Chueca, is the perfect place for tapas and have some drinks to start the night. Close at 12 PM",
        "geo": {
          "lat": "40.424343317092344",
          "lng": "-3.6975860595703125"
        },
        "address": "Calle de Augusto Figueroa, 24, 28004 Madrid, Spain"
      },
      {
        "title": "Chueca Neighborhood (Walking and Drinks)",
        "description": "Chueca in Madrid is the gay area and home to the coolest bars and restaurants around. The main street is packed with bars; the most difficult thing is to choose where to go. It makes for a very good bar crawl, but don’t go there if you are homophobic as it is very overtly gay.  A good starting point is Plaza de Chueca as the metro is there and most of the good streets for going out are around there. Try Sierra Angel, a little, old vermouth bar with lots of character which overlooks the square to get you going. Remember in Madrid nothing gets going until around 10 or later so have a siesta and eat late so you are ready to party into the early hours with the Spaniards.",
        "geo": {
          "lat": "40.455829687131434",
          "lng": "-3.6975860595703125"
        },
        "address": "Chueca, Madrid, Spain"
      },
      {
        "title": "Gabana 1800",
        "description": "Located on the ground floor of one of the most prestigious and luxurious hotels in the city, in the heart of the Salamanca district of Madrid, Gabana 1800 is synonymous with chic, exclusivity, luxury, quality, forefront in music, designer clothes, high-end cars, exquisite perfumes, the most expensive whiskeys and champagnes, guest lists, celebrities on its dance floor and in its private rooms and illustrious names, both national and international. Gabana 1800 has one of the most extensive and varied drink offer in the world. That is the reason why our customers can choose among rones, vodkas, gins, whiskeys and champagnes of the best years and warehouses, in their Magnum, Jeroboam and Mathusalem bottle formats. Our attendants perfectly know all our references and will be pleased to recommend you so you make your best choice. We also work with the best professionals in programming our agenda. The most prestigious and outstanding DJ’s share their nights with us, making us enjoy with their show and music. Undoubtedly, our public relations team can turn any event into the most chic celebration.",
        "geo": {
          "lat": "40.43002763221108",
          "lng": "-3.6841964721679688"
        },
        "address": "Calle de Velázquez, 6, 28001 Madrid, Spain"
      }
    ],

    [
      {
        "title": "Hotel Victoria",
        "description": "This historic hotel is in the heart of Madrid, by the Puerta del Sol. Facilities include free Wi-Fi and a café-bar on the large outdoor terrace. The Hotel Victoria 4 dates back to 1850 and offers elegant, renovated interiors. Rooms at Victoria 4 are soundproofed, with a free safety deposit box. They all offer a spacious bathroom with a bathtub and hairdryer. Continental breakfast is included in rates. There is a traditional restaurant and a range of tapas are on offer at the Café del Levante. Sol Metro Station is metres away and offers easy transport around the city. Victoria 4 is in a lively area, within walking distance of Gran Vía and the Art Triangle.",
        "geo": {
          "lat": "40.416204",
          "lng": "-3.701728"
        },
        "address": "Victoria, 4, Centro, 28012 Madrid"
      },
      {
        "title": "SkyDive Madrid",
        "description": "A tandem skydive is the easy way to try out skydiving with little responsibility. Myself and my colleagues will do the work your job will be to enjoy the view as we freefall at about 130 miles per hour.",
        "geo": {
          "lat": "40.45948689837197",
          "lng": "-3.4881591796875"
        },
        "address": "Carretera A-4, Km 64.400, 4, 45300 Ocaña, Toledo, Toledo, Spain"
      },
      {
        "title": "Museo Santiago Bernabéu",
        "description": "Museo of Santiago Bernabeu stadium",
        "geo": {
          "lat": "40.453109",
          "lng": "-3.6879969999999958"
        },
        "address": "Av de Concha Espina, 1, Madrid"
      }
    ]
  ],

  map: null,
  directionsDisplay: null,
  directionsService: new google.maps.DirectionsService(),
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
  bounds: new google.maps.LatLngBounds(),
  markersArray: [],
  wayPoints: [],


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
    this.directionsDisplay = new google.maps.DirectionsRenderer({ suppressMarkers: true });
    this.directionsDisplay.setMap(this.map);
  },



  setMarker: function(latlng, map, place) {
    var self = this,
    marker   = new google.maps.Marker({
        position: latlng,
        map: map,
        title: place.title,
        address: place.address,
        description: place.description,
        animation: google.maps.Animation.DROP,
        icon: this.markers.blue,
        shadow: "images/pointer-shadow.png"
    });

    this.bounds.extend(latlng);
    this.map.fitBounds(this.bounds);

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

      $('.id-'+ marker.id).siblings().removeClass('text-error').end().addClass('text-error');
    });

    // dbclick on marker
    google.maps.event.addListener(marker, 'dblclick', function () {
      self.map.setZoom(16);
    });
  },


  setMarkers: function(results) {
    var self = this;
    for (var i = 0; i < results.length; i++) {
      var place = results[i];
      self.setMarker(new google.maps.LatLng(place.geo.lat, place.geo.lng), self.map, place);

      self.wayPoints.push({
        location: new google.maps.LatLng(place.geo.lat, place.geo.lng),
        stopover: true
      });

      if (i + 1 === results.length) {
        self.directionsDisplay.setMap(self.map);
        self.calcRoute();
      }
    }
  },


  calcRoute: function() {
    var start = this.wayPoints[0].location,
    end = this.wayPoints[this.wayPoints.length - 1].location,
    request = {
      origin: start,
      destination: end,
      waypoints: this.wayPoints,
      travelMode: google.maps.TravelMode.WALKING
    },
    self = this;

    this.directionsService.route(request, function (result, status) {
      console.log(result);
      if (status == google.maps.DirectionsStatus.OK) {
        self.directionsDisplay.setDirections(result);
      }
    });
  },

  clearMap: function() {
    for (var i = 0; i < this.markersArray.length; i++ ) {
      this.markersArray[i].setMap(null);
    }

    this.directionsDisplay.setMap(null);
    this.markersArray = [];
    this.wayPoints    = [];
    this.bounds       = new google.maps.LatLngBounds();
  },


  showDay: function (num) {
    var pointsDays = maps.days[num];

    this.clearMap();
    this.setMarkers(pointsDays);

    $('#days-plan').html('');

    $.each(pointsDays, function (key, val) {
      $('#days-plan').append('<li class=""><h5>'+ val.title +'</h5><small class="muted">'+ val.address +'</small></li>');
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
    var day = $(this).data('day');

    if (!$(this).hasClass('disabled')) {
      maps.showDay(day);
      $(this).siblings().removeClass('disabled').end().addClass('disabled');
    }
    $('.datePlan').text($(this).data('date'));
  }).first().click();


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