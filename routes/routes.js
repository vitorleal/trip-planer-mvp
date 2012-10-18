module.exports = function(app, ensureAuthenticated, passport, User, Destination, Trip) {

    // Index
    app.get('/', function (req, res) {
        res.render('pages/index', {
            title: 'Plan it',
            description: 'Description of the first page'
        });
    });

    //Logout
    app.get('/logout', function (req, res) {
        req.logOut();
        res.redirect('/');
    });

    //About
    app.get('/about', function (req, res) {
        res.render('pages/about', {
            title: 'About us',
            description: 'Description of the about page'
        });
    });

    //Terms of use
    app.get('/terms-of-use', function (req, res) {
        res.render('pages/terms', {
            title: 'Terms of use',
            description: 'Description of the terms of use page'
        });
    });


    //Add city
    app.get('/cityes', function (req, res) {
        Destination.find({}, function (err, city) {
            res.render('admin/cityes', {
                title: 'Cityes',
                description: 'Description of cityes',
                citys: city
            });
        })
    });
        //Add city post
        app.post('/cityes', function (req, res) {
            var destination = new Destination();

            destination.country.name = req.body.country;
            destination.country.geoLocation.lat = req.body.countryGeolocation.split(',')[0];
            destination.country.geoLocation.lng = req.body.countryGeolocation.split(',')[1];
            destination.city.name = req.body.city;
            destination.city.geoLocation.lat = req.body.cityGeolocation.split(',')[0];
            destination.city.geoLocation.lng = req.body.cityGeolocation.split(',')[1];

            destination.save(function (err) {
                if (err) { throw err; }
                console.log('New city saved');
                res.redirect('/cityes');
            });
        });

        app.delete('/cityes', function (req, res) {
            Destination.findById(req.body.id, function (err, destination) {
                destination.remove(function (err, destination) {
                    console.log('City '+ destination +' deleted');
                    res.redirect('/cityes');
                });
            });
        });

    //Profile
    app.get('/profile', ensureAuthenticated, function (req, res) {

        var query = User.findOne({ 'facebook_id': req.user.facebook_id });

        query.exec(function (err, oldUser) {
            if(oldUser) {
                oldUser.last_update = new Date();
                oldUser.save(function (err) {
                    if (err) { throw err; }
                    console.log('User: ' + oldUser.name + ' updated!');
                });
            }
        });

        Destination.find({}, function (err, citys) {
            res.render('logged/profile', {
                title: req.user.name + ' profile - Plan it',
                description: 'Description of the profile page',
                name: req.user.name,
                email: req.user.email,
                username: req.user.username,
                facebook_id: req.user.facebook_id,
                gender: req.user.gender,
                hometown: req.user.hometown,
                location: req.user.location,
                birthday: req.user.birthday,
                createdAt: req.user.created_at,
                latsUpdate: req.user.last_update,
                destinations: citys
            });
        });
    });

    // Maps
    app.get('/map', ensureAuthenticated, function (req, res) {
        res.redirect('/profile#start');
    });
    app.post('/map', ensureAuthenticated, function (req, res) {
        Destination.findById(req.body.destination, function (err, destination) {
            res.render('logged/map', {
                title: "Planit Map",
                description: 'Description of the map page',
                user: {
                    name: req.user.name,
                    email: req.user.email,
                    username: req.user.username,
                    facebook_id: req.user.facebook_id,
                    gender: req.user.gender,
                    hometown: req.user.hometown,
                    location: req.user.location,
                    birthday: req.user.birthday,
                    createdAt: req.user.created_at,
                    latsUpdate: req.user.last_update
                },
                destination: destination
            });
        });
    });

    // Facebook auth routes
    app.get('/auth/facebook', passport.authenticate('facebook', { scope: [ 'email', 'user_birthday', 'user_hometown', 'user_checkins' ] }),
        function (req, res) {}
    );
    app.get('/auth/facebook/callback', passport.authenticate('facebook', { failureRedirect: '/login' }),
        function (req, res) {
            res.redirect('/profile');
        }
    );

}