const express = require("express");
const router = express.Router();
const Joi = require("@hapi/joi");

const scopes = require("../constants/scopes.json");
const requireJwtAuth = require("../middleware/requireJwtAuth");
const requireScope = require("../middleware/requireScope");
const sql = require('mssql/msnodesqlv8');
const { User } = require('../utils');
// const User = require("../models/User");

router.use((req, res, next) => {
  req.scope = scopes.ADMIN;
  next();
})

router.post("/admin/users", requireJwtAuth, requireScope, async (req, res) => {
  try {
    const result = await new sql.Request().query('SELECT _id, email, firstName, lastName, scope FROM users FOR JSON AUTO;'); //await User.find({}, "-password");
    res.send({
      users: result.recordset[0]
    });
  } catch ({ message }) {
    res.send({ message });
  }
});

router.post("/admin/users/create", requireJwtAuth, requireScope, async (req, res) => {
  const ps = new sql.PreparedStatement();
  try {
    const { user } = req.body;

    if (!user.password || user.password.length < 4) {
      delete user.password;
    }

    const schema = Joi.object({
      _id: Joi.number()
        .default(-1),
      email: Joi.string()
        .email()
        .required(),
      password: Joi.string()
        .min(5)
        .max(12),
      firstName: Joi.string()
        .required(),
      lastName: Joi.string()
        .required(),
      scope: Joi.number()
        .required()
    });
    const userSchema = await schema.validateAsync(user);
    if (userSchema.password) {
      userSchema.password = await User.hashPassword(userSchema.password);
    }

    ps.input('_id', sql.Int);
    ps.input('firstName', sql.VarChar(50));
    ps.input('lastName', sql.VarChar(50));
    ps.input('email', sql.VarChar(50));
    ps.input('scope', sql.Int);

    if (userSchema.password) {
      ps.input('password', sql.VarChar(255));
      await ps.prepare(`
        IF NOT EXISTS (SELECT * FROM users WHERE _id = @_id)

            INSERT INTO users (email, password, firstName, lastName, scope)
            VALUES (@email, @password, @firstName, @lastName, @scope)

        ELSE
            UPDATE users
            SET email = @email, password = @password, firstName = @firstName, lastName = @lastName, scope = @scope
            WHERE _id = @_id
        `);
    } else {
      await ps.prepare(`
        IF NOT EXISTS (SELECT * FROM users WHERE _id = @_id)

            INSERT INTO users (email, firstName, lastName, scope)
            VALUES (@email, @firstName, @lastName, @scope)

        ELSE
            UPDATE users
            SET email = @email, firstName = @firstName, lastName = @lastName, scope = @scope
            WHERE _id = @_id
        `);
    }
    await ps.execute(userSchema);
    await ps.unprepare();
    // await User.updateOne({ _id }, userSchema, { upsert: true });
    res.send({
      result: "Saved"
    });
  } catch ({ message }) {
    res.send({ message });
  }
});

router.post("/admin/users/del", requireJwtAuth, requireScope, async (req, res) => {
  const ps = new sql.PreparedStatement();
  try {
    const { users } = req.body;
    // const result = await User.deleteMany({ _id: users });

    // Construct an object of parameters, using arbitrary keys
    var paramsObj = users.reduce((obj, val, idx) => {
      obj[`id${idx}`] = val;
      ps.input(`id${idx}`, sql.Int);
      return obj;
    }, {});
    // Manually insert the params' arbitrary keys into the statement
    var stmt = "DELETE from users where _id in (" + Object.keys(paramsObj).map((o) => { return '@' + o }).join(',') + ')';
    await ps.prepare(stmt);
    const result = await ps.execute(paramsObj);
    await ps.unprepare();

    res.send({
      result
    });
  } catch ({ message }) {
    res.send({ message });
  }
});

module.exports = router;
