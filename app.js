// Module dependencies
var express = require("express"),

    http             = require("http"),
    path             = require("path"),
    i18n             = require("i18n"),
    moment           = require("moment"),

    mongoose         = require("mongoose"),
    schema           = mongoose.Schema,
    db               = mongoose.createConnection("localhost", "test"),
    mongoSession     = require("connect-mongo")(express),

    passport         = require("passport"),

    flash            = require('connect-flash'),

    app              = express();


// Config express
app.configure(function () {
    app.set('port', process.env.PORT || 3000);
    app.set('views', __dirname + '/views');
    app.set('view engine', 'jade');
    app.set('view options', { layout: false });

    app.use(express.favicon(__dirname + '/public/images/favicon.png'));
    app.use(express.logger('dev'));
    app.use(express.bodyParser());
    app.use(express.methodOverride());

    app.use(express.cookieParser());
    app.use(express.session({
        secret: "plnit2012",
        store: new mongoSession({
            db: 'test'
        })
    }));
    app.use(passport.initialize());
    app.use(passport.session());

    //flash messages for error or success with the redirect
    app.use(flash());

    app.use(app.router);

    app.use(express.static(path.join(__dirname, 'public')));

    app.use(require('less-middleware')({
        src:  __dirname + '/public/less',
        dest: __dirname + '/public/stylesheets',
        prefix: '/stylesheets',
        compress: true
    }));

    app.use(i18n.init);

    app.locals({
        date: function(date) {
            return moment(date).format('MM/DD/YYYY');
        },
        fromNow: function(date) {
            return moment(date).fromNow();
        },
        yearsOld: function(birthday) {
            var year      = new Date().getFullYear(),
                birthyear = new Date(birthday).getFullYear();

            return (year - birthyear);
        },
        addDays: function(date, days) {
            return moment(date).add('days', days);
        }
    });
});

// Dev Config
app.configure('development', function () {
    app.use(express.errorHandler({ showStack: true, dumpExceptions: true }));
    //Data passing to the passparot configuration in /config/passaport.js
    app.set('facebookId', '547560318604399');
    app.set('facebookSecret', 'c8c65f46c7e3807e8ac5e8cca0e3f942');
});

app.configure('production', function () {
    app.use(express.errorHandler());
    //Data passing to the passparot configuration in /config/passaport.js
    app.set('facebookId', '112711522214518');
    app.set('facebookSecret', 'f6a03086d3530372c5715458b7ef9563');
});


// i18n Config
i18n.configure({
    locales:['en', 'pt-br', 'es'],
    register: global
});


// User model
var userSchema = new schema({
    name:        String,
    email:       String,
    username:    String,
    gender:      String,
    facebook_id: String,
    hometown:    String,
    location:    String,
    locale:      String,
    birthday:    String,
    created_at: {
        type:    Date,
        default: Date.now
    },
    last_update: {
        type:    Date,
        default: Date.now
    },
    interests: {
        museums:   Array,
        outdoors:  Array,
        sports:    Array,
        nightlife: Array,
        type_food: Array,
        music:     Array,
        events:    Array
    }
}),
User = db.model('User', userSchema),

// Destination schema
destinationSchema = new schema({
    country: {
        name: String,
        geoLocation: {
            lat: String,
            lng: String
        }
    },
    city: {
        name: String,
        geoLocation: {
            lat: String,
            lng: String
        }
    }
}),
Destination = db.model('Destination', destinationSchema),

tripSchema = new schema({
    user_id: String,
    title: {
        type: String,
        default: "Untitled"
    },
    date_start: Date,
    total_days: String,
    destination: {
        id: String,
        name: String,
        lat: String,
        lng: String
    },
    poi: Array,
    hotel_id: String,
    intensity: String
}),
Trip = db.model('Trip', tripSchema),

pointSchema = new schema({
    city: String,
    title: {
        type: String,
        default: "Untitled"
    },
    description: {
        type: String,
        default: "No description provided yet"
    },
    geoLocation: {
        lat: String,
        lng: String
    },
    category: {
        type: String,
        default: "no category"
    },
    promotion: {
        type: Boolean,
        default: false
    },
    address: {
        type: String,
        default: "no address"
    },
    promo_details: {
        type: String,
        default: "No details provided"
    }
}),
Point = db.model('Point', pointSchema);


//Passaport config
var passaportConifg     = require('./configs/passaport.js')(passport, User, app.get('facebookId'), app.get('facebookSecret')),
    ensureAuthenticated = function (req, res, next) {
        if (req.isAuthenticated()) {
            return next();
        }
        res.redirect('/');
    };


//Routes
var routes = require("./routes/routes.js")(app, ensureAuthenticated, passport, User, Destination, Trip, Point);


// Create the server
http.createServer(app).listen(app.get('port'), function() {
    console.log("Express server listening on port %s in %s environment with facebook id %s", app.get('port'), process.env.NODE_ENV, app.get('facebookId'));
});


//To start the enviroments
//NODE_ENV=production forever start app.js
