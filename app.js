
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

    app.use(app.router);

    app.use(require('less-middleware')({
        src: __dirname + '/public',
        enable: ['less']
    }));

    app.use(express.static(path.join(__dirname, 'public')));

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
        }
    });
});

// Dev Config
app.configure('development', function () {
    app.use(express.errorHandler());
});

app.configure('production', function () {
    app.use(express.errorHandler());
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
passaportConifg = require('./configs/passaport.js')(passport, User);

//Routes
routes = require("./routes/routes.js")(app, ensureAuthenticated, passport, User, Destination, Trip, Point);


// Create the server
http.createServer(app).listen(app.get('port'), function() {
    console.log("Express server listening on port " + app.get('port'));
});
