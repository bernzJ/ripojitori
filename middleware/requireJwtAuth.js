const passport = require('passport');

const requireJwtAuth = function (req, res, next) {
  passport.authenticate("jwt", { session: false }, function (err, user, info) {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.send({ message: info, invalidateSesssion: true });
    }
    req.user = user;
    next();
  })(req, res, next);
};

module.exports = requireJwtAuth;