const express = require("express");
const router = express.Router();
const Joi = require("@hapi/joi");
const sql = require('mssql/msnodesqlv8');

const scopes = require("../constants/scopes.json");
const requireJwtAuth = require("../middleware/requireJwtAuth");
const requireScope = require("../middleware/requireScope");
// const Company = require("../models/Company");


// @NOTE: unsafe way of scoping from routes.
router.use((req, res, next) => {
  //console.log(req.path);
  req.scope = scopes.PLEB;
  next();
});

router.post("/api/companies", requireJwtAuth, requireScope, async (req, res) => {
  try {
    const result = await new sql.Request().query(`SELECT _id, projectResource, clientName, segment, category, status, hours, start, "end"${req.user.scope === scopes.ADMIN ? ", scope" : ""} FROM companies FOR JSON AUTO;`); //await Company.find({}, `-_v ${req.user.scope === scopes.ADMIN ? "" : "-scope"}`);
    res.send({
      companies: result.recordset[0]
    });
  } catch ({ message }) {
    res.send({ message })
  }
});

router.post("/api/companies/create", requireJwtAuth, requireScope, ((req, res, next) => req.user.scope <= scopes.PLEB ? res.send({ message: "permission denied." }) : next()), async (req, res) => {
  const ps = new sql.PreparedStatement();
  try {
    const user = req.user;
    const { company } = req.body;
    const schema = Joi.object({
      _id: Joi.number()
        .default(-1),
      projectResource: Joi.string()
        .required(),
      clientName: Joi.string()
        .required(),
      segment: Joi.string()
        .required(),
      category: Joi.string()
        .required(),
      status: Joi.string()
        .required(),
      hours: Joi.string()
        .required(),
      start: Joi.date()
        .required(),
      end: Joi.date()
        .required(),
      scope: Joi.number()
    });
    const companySchema = await schema.validateAsync(company);

    if (user.scope !== scopes.ADMIN) {
      //delete companySchema.scope;
      companySchema.scope = 0;
    }

    ps.input('_id', sql.Int);
    ps.input('projectResource', sql.VarChar(50));
    ps.input('clientName', sql.VarChar(50));
    ps.input('segment', sql.VarChar(50));
    ps.input('category', sql.VarChar(50));
    ps.input('status', sql.VarChar(50));
    ps.input('hours', sql.VarChar(50));
    ps.input('start', sql.DateTime);
    ps.input('end', sql.DateTime);
    ps.input('scope', sql.Int);

    // await Company.updateOne({ _id }, companySchema, { upsert: true });
    await ps.prepare(`
      IF NOT EXISTS (SELECT * FROM companies WHERE _id = @_id)

          INSERT INTO companies (projectResource, clientName, segment, category, status, hours, start, "end", scope)
          VALUES (@projectResource, @clientName, @segment, @category, @status, @hours, @start, @end, @scope)

      ELSE
          UPDATE companies
          SET projectResource = @projectResource, clientName = @clientName, segment = @segment, category = @category, status = @status, hours = @hours, start = @start, "end" = @end, scope = @scope
          WHERE _id = @_id
     `);
    await ps.execute(companySchema);

    res.send({
      result: "Saved"
    });
  } catch ({ message }) {
    res.send({ message })
  } finally {
    await ps.unprepare();
  }
});

router.post("/api/companies/del", requireJwtAuth, requireScope, ((req, res, next) => req.user.scope !== scopes.ADMIN ? res.send({ message: "permission denied." }) : next()), async (req, res) => {
  const ps = new sql.PreparedStatement();
  try {
    const { companies } = req.body;
    //const result = await Company.deleteMany({ _id: companies });

    var paramsObj = companies.reduce((obj, val, idx) => {
      obj[`id${idx}`] = val;
      ps.input(`id${idx}`, sql.Int);
      return obj;
    }, {});
    // Manually insert the params' arbitrary keys into the statement
    var stmt = "DELETE from companies where _id in (" + Object.keys(paramsObj).map((o) => { return '@' + o }).join(',') + ')';
    await ps.prepare(stmt);
    const result = await ps.execute(paramsObj);

    res.send({
      result
    });
  } catch ({ message }) {
    res.send({ message })
  } finally {
    await ps.unprepare();
  }
});

module.exports = router;
