const passport = require("passport");

const requireLocalAuth = function(req, res, next) {
  passport.authenticate("local", function(err, user, info) {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.status(500).send({ message: info, invalidateSesssion: true });
    }
    req.user = user;
    next();
  })(req, res, next);
};

module.exports = requireLocalAuth;