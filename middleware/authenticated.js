// route middleware to make sure a user is logged in
const authenticated = (req, res, next) => {

    // if user is authenticated in the session, carry on
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/users');
}

module.exports = authenticated;
