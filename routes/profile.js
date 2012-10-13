
/*
 * GET profile page.
 */

exports.profile = function(req, res) {
    res.render('profile', {
        title: 'Plan it',
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
};