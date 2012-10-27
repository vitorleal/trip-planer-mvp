module.exports = function(passport, User) {

    var facebookStrategy = require("passport-facebook").Strategy;

    // Facebook auth
    //clientID    : '547560318604399', localhost app
    //clientSecret: 'c8c65f46c7e3807e8ac5e8cca0e3f942', localhost app
    passport.use(new facebookStrategy({
            clientID    : '112711522214518',
            clientSecret: 'f6a03086d3530372c5715458b7ef9563',
            callbackURL : "/auth/facebook/callback"
        },
        function (accessToken, refreshToken, profile, done) {

            var query = User.findOne({ 'facebook_id': profile.id });

            query.exec(function (err, oldUser) {
                if(oldUser) {
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
    ensureAuthenticated = function (req, res, next) {
        if (req.isAuthenticated()) {
            return next();
        }
        res.redirect('/');
    }
}
