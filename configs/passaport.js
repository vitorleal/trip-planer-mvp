module.exports = function(passport, User, facebookId, facebookSecret) {

    var facebookStrategy = require("passport-facebook").Strategy;

    passport.use(new facebookStrategy({
            clientID    : facebookId,
            clientSecret: facebookSecret,
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
};
