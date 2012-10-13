
// Module dependencies
var express = require("express"),

    routes  = {
        index  : require("./routes").index,
        logout : require("./routes/logout.js").logout,
        about  : require("./routes/about.js").about,
        profile: require("./routes/profile.js").profile
    },

    http             = require("http"),
    path             = require("path"),
    i18n             = require("i18n"),
    moment           = require("moment"),

    mongoose         = require("mongoose"),
    schema           = mongoose.Schema,
    db               = mongoose.createConnection("localhost", "test"),
    mongoSession     = require("connect-mongo")(express),

    passport         = require("passport"),
    facebookStrategy = require("passport-facebook").Strategy,

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


// Facebook auth
passport.use(new facebookStrategy({
        clientID    : '112711522214518',
        clientSecret: 'f6a03086d3530372c5715458b7ef9563',
        callbackURL : "http://localhost:3000/auth/facebook/callback"
    },
    function (accessToken, refreshToken, profile, done) {

        var query = User.findOne({ 'facebook_id': profile.id });

        query.exec(function (err, oldUser) {
            if(oldUser) {
                oldUser.last_update = new Date();
                oldUser.save(function (err) {
                    if (err) { throw err; }
                    console.log('User: ' + oldUser.name + ' updated!');
                });
                console.log('User: ' + oldUser.name + ' found and logged in!');
                done(null, oldUser);
            } else {
                var newUser         = new User();

                newUser.name        = profile.displayName;
                newUser.email       = profile.emails[0].value;
                newUser.username    = profile.username;
                newUser.facebook_id = profile.id;
                newUser.gender      = profile.gender;
                newUser.hometown    = profile._json.hometown.name;
                newUser.location    = profile._json.location.name;
                newUser.birthday    = profile._json.birthday;
                newUser.locale      = profile._json.locale;

                newUser.save(function (err) {
                    if (err) { throw err; }
                    console.log('New user: ' + newUser.name + ' created and logged in!');
                    done(null, newUser);
                });
            }
        });
    }
));


// Serealize user
passport.serializeUser(function (user, done) {
    done(null, user);
});
passport.deserializeUser(function(user, done) {
    User.findOne({ '_id': user._id }, function (err, user) {
        done(err, user);
    });
});
var ensureAuthenticated = function (req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/');
}


// Routes
app.get('/', routes.index);
app.get('/logout', routes.logout);
app.get('/about', routes.about);
app.get('/profile', ensureAuthenticated, routes.profile);


// Facebook auth routes
app.get('/auth/facebook',
    passport.authenticate('facebook' ,
    { scope: [ 'email', 'user_birthday', 'user_hometown' ] }),
    function (req, res) {}
);
app.get('/auth/facebook/callback',
    passport.authenticate('facebook', { failureRedirect: '/login' }),
    function (req, res) {
        res.redirect('/profile');
    }
);


// Create the server
http.createServer(app).listen(app.get('port'), function() {
    console.log("Express server listening on port " + app.get('port'));
});
