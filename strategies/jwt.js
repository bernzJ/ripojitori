const passport = require("passport");
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const sql = require('mssql/msnodesqlv8');

const keys = require("../config/keys");
// const { User } = require('../utils');
// const User = require("../models/User");

// JWT strategy
const jwtLogin = new JwtStrategy(
  {
    jwtFromRequest: ExtractJwt.fromBodyField("x-auth-token"),
    secretOrKey: keys.secretOrKey
  },
  async (payload, done) => {
    const ps = new sql.PreparedStatement();
    try {
      // const user = await User.findById(payload.sub);
      ps.input('_id', sql.Int);
      await ps.prepare("SELECT * FROM users WHERE _id = @_id FOR JSON AUTO, WITHOUT_ARRAY_WRAPPER;");
      const result = await ps.execute({ _id: payload.sub });
      const user = result.recordset[0];
      if (user) {
        done(null, user);
      } else {
        done(null, false);
      }
    } catch ({ message }) {
      done(null, false, message);
    } finally {
      await ps.unprepare();
    }
  }
);

passport.use(jwtLogin);
