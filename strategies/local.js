const passport = require("passport");
const PassportLocalStrategy = require("passport-local").Strategy;
const Joi = require("@hapi/joi");
const sql = require('mssql/msnodesqlv8');
const { User } = require('../utils');
// const User = require("../models/User");

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
    const ps = new sql.PreparedStatement();
    try {
      const userSchema = await schema.validateAsync({ email, password });
      var user = null;
      // const user = await User.findOne({ email: userSchema.email }, "-__v");

      ps.input('email', sql.VarChar(50));
      await ps.prepare("SELECT * FROM users WHERE email = @email FOR JSON AUTO, WITHOUT_ARRAY_WRAPPER;");
      const result = await ps.execute({ email: userSchema.email });
      await ps.unprepare();

      user = result.recordset[0];


      if (!user) {
        done(null, false, "Email does not exists.");
        return;
      }
      const isMatch = await User.comparePassword(userSchema.password, user.password);
      if (!isMatch) {
        done(null, false, "Incorrect password.");
        return;
      }
      done(null, user);
    } catch ({ message }) {
      done(null, false, message);
    }
  }
);

passport.use(passportLogin);
