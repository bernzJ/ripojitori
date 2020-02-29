const passport = require("passport");
const PassportLocalStrategy = require("passport-local").Strategy;
const Joi = require("@hapi/joi");
const User = require("../models/User");

const passportLogin = new PassportLocalStrategy(
  {
    usernameField: 'email',
    passwordField: 'password',
    session: false
  },
  async (email, password, done) => {
    const schema = Joi.object({
      email: Joi.string()
        .email()
        .required(),
      password: Joi.string()
        .min(5)
        .max(12)
        .required()
    });
    try {
      const userSchema = await schema.validateAsync({ email, password });
      const user = await User.findOne({ email: userSchema.email });
      if (!user) {
        return done(null, false, { message: "Email does not exists." });
      }
      user.comparePassword(userSchema.password, function (err, isMatch) {
        if (err) {
          return done(err);
        }
        if (!isMatch) {
          return done(null, false, { message: "Incorrect password." });
        }
        return done(null, user);
      });
    } catch (error) {
      return done(error);
    }
  }
);

passport.use(passportLogin);
