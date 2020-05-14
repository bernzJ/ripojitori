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

router.post("/industries", requireJwtAuth, requireScope, async (req, res, next) => {
  try {
    //SELECT _id, projectResource, clientName, segment, category, status, hours, start, "end"${req.user.scope === scopes.ADMIN ? ", scope" : ""} FROM companies FOR JSON AUTO;
    const result = await new sql.Request().query(`SELECT * FROM [dbo].[Industries] FOR JSON AUTO;`);
    res.send({
      industries: result.recordset[0]
    });
  } catch ({ message }) {
    res.status(500).send({ message });;
  }
});

router.post("/industries/create", requireJwtAuth, requireScope, ((req, res, next) => req.user.scope <= scopes.PLEB ? res.send({ message: "permission denied." }) : next()), async (req, res) => {
  const ps = new sql.PreparedStatement();
  try {

    const { Industry } = req.body;
    const schema = Joi.object({
      Id: Joi.number()
        .default(-1),
      Name: Joi.string()
        .required()
    });
    const industrySchema = await schema.validateAsync(Industry);

    // ps.input('Id', sql.Int);
    ps.input('Name', sql.VarChar(50));

    // await Company.updateOne({ _id }, companySchema, { upsert: true });
    await ps.prepare(`INSERT INTO [dbo].[Industries] ([Name]) VALUES(@Name)`);
    await ps.execute(industrySchema);
    await ps.unprepare();

    res.send({
      result: "Saved"
    });
  } catch ({ message }) {
    res.status(500).send({ message });;
  }
});

module.exports = router;
