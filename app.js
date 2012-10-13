
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

    app.use(express.favicon());
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
            return moment(date).fromNow()
        }
    });
});

// Dev Config
app.configure('development', function () {
    app.use(express.errorHandler());
});


// i18n Config
i18n.configure({
    locales:['en', 'pt-br', 'es'],
    register: global
});

// Moment date config
//moment.lang('pt-br');


// User model
var userSchema = new schema({
    name: String,
    email: String,
    username: String,
    gender: String,
    facebook_id: String,
    hometown: String,
    location: String,
    locale: String,
    birthday: String,
    created_at: {
        type: Date,
        default: Date.now
    },
    last_update: {
        type: Date,
        default: Date.now
    }
}),
User = db.model('User', userSchema);

//Passaport config
passaportConifg = require('./configs/passaport.js')(passport, User);

//Routes
routes = require("./routes/routes.js")(app, ensureAuthenticated, passport);


// Create the server
http.createServer(app).listen(app.get('port'), function() {
    console.log("Express server listening on port " + app.get('port'));
});
