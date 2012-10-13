
/*
 * GET Logout.
 */

exports.logout = function(req, res){
    req.logOut();
    res.redirect('/');
};

