module.exports = function(app, ensureAuthenticated, passport) {

    // Index
    app.get('/', function(req, res) {
        res.render('index', {
            title: 'Plan it',
            description: 'Description of the first page'
        });
    });

    //Logout
    app.get('/logout', function(req, res) {
        req.logOut();
        res.redirect('/');
    });

    //About
    app.get('/about', function(req, res) {
        res.render('about', {
            title: 'About us',
            description: 'Description of the about page'
        });
    });

    //About
    app.get('/terms-of-use', function(req, res) {
        res.render('terms', {
            title: 'Terms of use',
            description: 'Description of the terms of use page'
        });
    });

    //Profile
    app.get('/profile', ensureAuthenticated, function(req, res) {
        res.render('profile', {
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
            latsUpdate: req.user.last_update
        });
    });

    // Facebook auth routes
    app.get('/auth/facebook',
        passport.authenticate('facebook', { scope: [ 'email', 'user_birthday', 'user_hometown' ] }),
        function (req, res) {}
    );
    app.get('/auth/facebook/callback',
        passport.authenticate('facebook', { failureRedirect: '/login' }),
        function (req, res) {
            res.redirect('/profile');
        }
    );

}