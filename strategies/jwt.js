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
      ps.input('Id', sql.Int);
      await ps.prepare("SELECT * FROM Users WHERE Id = @Id FOR JSON AUTO, WITHOUT_ARRAY_WRAPPER;");
      const result = await ps.execute({ Id: payload.sub });
      await ps.unprepare();

      const user = result.recordset[0];
      if (user) {
        delete user.Password;
        done(null, user);
      } else {
        done(null, false);
      }
    } catch ({ message }) {
      done(null, false, message);
    }
  }
);

passport.use(jwtLogin);
