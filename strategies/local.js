const passport = require("passport");
const PassportLocalStrategy = require("passport-local").Strategy;
const Joi = require("@hapi/joi");
const sql = require('mssql/msnodesqlv8');
const { User } = require('../utils');
// const User = require("../models/User");

const passportLogin = new PassportLocalStrategy(
  {
    usernameField: 'Email',
    passwordField: 'Password',
    session: false
  },
  async (Email, Password, done) => {
    const schema = Joi.object({
      Email: Joi.string()
        .email()
        .required(),
      Password: Joi.string()
        .min(5)
        .max(12)
        .required()
    });
    const ps = new sql.PreparedStatement();
    try {
      const userSchema = await schema.validateAsync({ Email, Password });
      var user = null;
      // const user = await User.findOne({ email: userSchema.email }, "-__v");

      ps.input('Email', sql.VarChar(50));
      await ps.prepare("SELECT * FROM Users WHERE Email = @Email FOR JSON AUTO, WITHOUT_ARRAY_WRAPPER;");
      const result = await ps.execute({ Email: userSchema.Email });
      await ps.unprepare();

      user = result.recordset[0];


      if (!user) {
        done(null, false, "Email does not exists.");
        return;
      }
      
      const isMatch = await User.comparePassword(userSchema.Password, user.Password);
      if (!isMatch) {
        done(null, false, "Incorrect password.");
        return;
      }
      delete user.Password;
      done(null, user);
    } catch ({ message }) {
      done(null, false, message);
    }
  }
);

passport.use(passportLogin);
