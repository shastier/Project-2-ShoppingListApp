const bcrypt = require('bcryptjs');

// returns true if the passwords match.
function comparePass(userPassword, databasePassword) {
    return bcrypt.compareSync(userPassword, databasePassword);
}

function loginRedirect(req, res, next) {
    if (req.user) return res.redirect('/user');
    return next();
}

function loginRequired(req, res, next) {
    if (!req.user) return res.redirect('/auth/login');
    return next();
}

module.exports = {
    comparePass,
    loginRedirect,
    loginRequired
};