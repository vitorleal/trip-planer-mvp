module.exports = function(app, ensureAuthenticated, passport, User, Destination, Trip, Point) {

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
    app.get('/cities', function (req, res) {
        Destination.find({}, function (err, city) {
            res.render('admin/cities', {
                title: 'Cities',
                description: 'Description of cities',
                cities: city
            });
        });
    });
        //Add city post
        app.post('/cities', function (req, res) {
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
                res.redirect('/cities');
            });
        });

        app.delete('/cities', function (req, res) {
            Destination.findById(req.body.id, function (err, destination) {
                destination.remove(function (err, destination) {
                    console.log('City '+ destination +' deleted');
                    res.redirect('/cities');
                });
            });
        });


    //Maps points
    app.get('/points', function (req, res) {
        Point.find({ }, function (err, points) {
            res.render('admin/points', {
                title: 'Maps points',
                description: 'Description of maps points',
                points: points
            });
        });
    });
        //Add point post
        app.post('/points', function (req, res) {
            var point = new Point();

            point.city            = req.body.city;
            point.title           = req.body.title;
            point.description     = req.body.description;
            point.category        = req.body.category;
            point.promotion       = req.body.promotion;
            point.promo_details   = req.body.promo_details;
            point.address         = req.body.address;
            point.geoLocation.lat = req.body.latlng.split(',')[0];
            point.geoLocation.lng = req.body.latlng.split(',')[1];

            point.save(function (err) {
                if (err) { throw err; }
                console.log('New point saved');
                res.redirect('/points');
            });
        });
        app.delete('/points', function (req, res) {
            Point.findById(req.body.id, function (err, point) {
                point.remove(function (err, point) {
                    console.log('Point '+ point +' deleted');
                    res.redirect('/points');
                });
            });
        });
    app.get('/points/edit/:id', function (req, res) {
        Point.findById(req.params.id, function (err, point) {
            res.render('admin/points-edit', {
                title: 'Edit point',
                description: 'Description of maps points',
                point: point
            });
        });
    });
        app.put('/points/edit/:id', function (req, res) {
            Point.findById(req.params.id, function (err, point) {
                point.city            = req.body.city;
                point.title           = req.body.title;
                point.description     = req.body.description;
                point.category        = req.body.category;
                point.promotion       = req.body.promotion;
                point.promo_details   = req.body.promo_details;
                point.address         = req.body.address;
                point.geoLocation.lat = req.body.latlng.split(',')[0];
                point.geoLocation.lng = req.body.latlng.split(',')[1];

                point.save(function (err) {
                    if (err) { throw err; }
                    console.log('Point updated');
                    res.redirect('/points');
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
                user: req.user,
                destinations: citys,
                success: req.flash('success')
            });
        });
    });
        app.put('/profile', ensureAuthenticated, function (req, res) {
            User.findOne({ 'facebook_id': req.user.facebook_id }, function (err, user) {
                user.interests.museums   = req.body.museums;
                user.interests.outdoors  = req.body.outdoors;
                user.interests.sports    = req.body.sports;
                user.interests.nightlife = req.body.nightlife;
                user.interests.type_trip = req.body.type_trip;
                user.interests.type_food = req.body.type_food;

                console.log(req.body);
                user.save(function (err) {
                    if (err) { throw err; }
                    console.log('User updated');
                    req.flash('success', 'Successfully updated!');
                    res.redirect('/profile');
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
                destination: destination,
                trip: {
                    date: req.body.date,
                    days: req.body.days,
                    intensity: req.body.intensity
                }
            });
        });
    });
        app.get('/users/:city', function (req, res) {
            User.find({ location: {'$regex': req.params.city } }, { facebook_id : 1, name: 1, email: 1 }, function (err, users) {

                res.send(users);
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

};