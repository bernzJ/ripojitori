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

router.post("/admin/users", requireJwtAuth, requireScope, async (req, res, next) => {
  try {
    const result = await new sql.Request().query('SELECT Id, Email, [FirstName], [LastName], Scope FROM Users FOR JSON AUTO;'); //await User.find({}, "-password");
    res.send({
      users: result.recordset[0]
    });
  } catch ({ message }) {
    res.status(500).send({ message });
  }
});

router.post("/admin/users/create", requireJwtAuth, requireScope, async (req, res, next) => {
  const ps = new sql.PreparedStatement();
  try {
    const { user } = req.body;

    if (!user.Password || user.Password.length < 4) {
      delete user.Password;
    }

    const schema = Joi.object({
      Id: Joi.number()
        .default(-1),
      Email: Joi.string()
        .email()
        .required(),
      Password: Joi.string()
        .min(5)
        .max(12),
      FirstName: Joi.string()
        .required(),
      LastName: Joi.string()
        .required(),
      Scope: Joi.number()
        .required()
    });
    const userSchema = await schema.validateAsync(user);

    if (userSchema.Password) {
      userSchema.Password = await User.hashPassword(userSchema.Password);
    } else {
      userSchema.Password = '';
    }

    ps.input('Id', sql.Int);
    ps.input('FirstName', sql.VarChar(50));
    ps.input('LastName', sql.VarChar(50));
    ps.input('Email', sql.VarChar(50));
    ps.input('Scope', sql.Int);
    ps.input('Password', sql.VarChar(255));


    await ps.prepare(`EXEC [dbo].[update_user] @Id, @Email, @Password, @FirstName, @LastName, @Scope`);

    await ps.execute(userSchema);
    await ps.unprepare();
    // await User.updateOne({ _id }, userSchema, { upsert: true });
    res.send({
      result: "Saved"
    });
  } catch ({ message }) {
    res.status(500).send({ message });
  }
});

router.post("/admin/users/del", requireJwtAuth, requireScope, async (req, res, next) => {
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
    var stmt = "DELETE from Users where Id in (" + Object.keys(paramsObj).map((o) => { return '@' + o }).join(',') + ')';
    await ps.prepare(stmt);
    const result = await ps.execute(paramsObj);
    await ps.unprepare();

    res.send({
      result
    });
  } catch ({ message }) {
    res.status(500).send({ message });
  }
});

module.exports = router;
