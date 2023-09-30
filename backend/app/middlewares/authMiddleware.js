const passport = require('passport');

const authenticateJWT = (req, res, next) => {
    passport.authenticate('jwt', { session: false })(req, res, next);
};

module.exports = authenticateJWT