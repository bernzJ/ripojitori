const passport = require('passport');

const requireJwtAuth = function (req, res, next) {
  passport.authenticate("jwt", { session: false }, function (err, user, info) {
    if (err) {
      return next(err);
    }
    // @TODO: check what this returns.
    if (!user) {
      return res.status(500).send({ message: info, invalidateSesssion: true });
    }
    req.user = user;
    next();
  })(req, res, next);
};

module.exports = requireJwtAuth;