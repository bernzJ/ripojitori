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
      const user = await User.findOne({ email: userSchema.email }, "-__v");
      if (!user) {
        done(null, false, "Email does not exists.");
        return;
      }
      const isMatch = await user.comparePassword(userSchema.password);
      if (!isMatch) {
        done(null, false, "Incorrect password.");
        return;
      }
      done(null, user.toObject());
    } catch ({ message }) {
      done(null, false, message);
    }
  }
);

passport.use(passportLogin);
