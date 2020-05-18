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

router.post("/customers", requireJwtAuth, requireScope, async (req, res, next) => {
  try {
    //SELECT _id, projectResource, clientName, segment, category, status, hours, start, "end"${req.user.scope === scopes.ADMIN ? ", scope" : ""} FROM companies FOR JSON AUTO;
    const result = await new sql.Request().query(`SELECT * FROM [dbo].[main_customers] FOR JSON AUTO;`);
    res.send({
      customers: result.recordset[0]
    });
  } catch ({ message }) {
    res.status(500).send({ message });
  }
});

router.post("/customers/create", requireJwtAuth, requireScope, ((req, res, next) => req.user.scope <= scopes.PLEB ? res.send({ message: "permission denied." }) : next()), async (req, res) => {
  const ps = new sql.PreparedStatement();
  try {
    const user = req.user;
    const { customer } = req.body;
    const schema = Joi.object({
      Id: Joi.number().default(-1),
      Name: Joi.string()
        .max(150)
        .required(),
      Website: Joi.string().max(255),
      Industry: Joi.number().required(),
      Timezone: Joi.number().required(),
      FiscalYearId: Joi.number().default(-1),
      FiscalYearBegin: Joi.date(),
      FiscalYearEnd: Joi.date(),
      FiscalYearMonthEndClosePeriod: Joi.date(),
      FiscalYearQuarterlyCloseCycle: Joi.date(),
      EmployeesCount: Joi.number().default(0),
      OMS: Joi.number().required(),
      ActiveProjects: Joi.boolean().default(false),
      FinancialId: Joi.number().default(-1),
      FinancialPlatform: Joi.string().max(50),
      HRId: Joi.number().default(-1),
      HRSystem: Joi.string().max(50),
      SSO: Joi.boolean().default(false),
      TestSite: Joi.boolean().default(false),
      RefreshDate: Joi.date(),
      Logo: Joi.any().default(''),
      Address1: Joi.string()
        .max(255)
        .required(),
      Address2: Joi.string().max(255),
      City: Joi.string()
        .max(255)
        .required(),
      Zip: Joi.string().max(50),
      Country: Joi.number().default(1),
      State: Joi.number().default(71),
      LGOwner: Joi.string().max(50),
      AddressLngLat: Joi.string()
        .max(150)
        .required(),
      EmployeeGroupsId: Joi.number().default(-1),
      EmployeeGroupsName: Joi.string().max(50)
    });

    const customerSchema = await schema.validateAsync(customer);

    ps.input('Id', sql.Int);
    ps.input('Name', sql.NVarChar(150));
    ps.input('Website', sql.NVarChar(255));
    ps.input('Industry', sql.Int);
    ps.input('Timezone', sql.Int);
    ps.input('FiscalYearId', sql.Int);
    ps.input('FiscalYearBegin', sql.Date);
    ps.input('FiscalYearEnd', sql.Date);
    ps.input('FiscalYearMonthEndClosePeriod', sql.Date);
    ps.input('FiscalYearQuarterlyCloseCycle', sql.Date);
    ps.input('EmployeesCount', sql.Int);
    ps.input('OMS', sql.Int);
    ps.input('ActiveProjects', sql.Bit);
    ps.input('FinancialId', sql.Int);
    ps.input('FinancialPlatform', sql.NVarChar(50));
    ps.input('HRId', sql.Int);
    ps.input('HRSystem', sql.NVarChar(50));
    ps.input('SSO', sql.Bit);
    ps.input('TestSite', sql.Bit);
    ps.input('RefreshDate', sql.DateTime);
    ps.input('Logo', sql.Image);
    ps.input('Address1', sql.NVarChar(255));
    ps.input('Address2', sql.NVarChar(255));
    ps.input('City', sql.NVarChar(255));
    ps.input('Zip', sql.NVarChar(50));
    ps.input('Country', sql.Int);
    ps.input('State', sql.Int);
    ps.input('LGOwner', sql.NVarChar(50));
    ps.input('EmployeeGroupsId', sql.Int);
    ps.input('EmployeeGroupsName', sql.NVarChar(50));
    ps.input('AddressLngLat', sql.NVarChar(150));

    await ps.prepare(`EXEC [dbo].[update_customer] @Id, @Name, @Website, @Industry, @Timezone, @FiscalYearId, @FiscalYearBegin, @FiscalYearEnd, @FiscalYearMonthEndClosePeriod, @FiscalYearQuarterlyCloseCycle, @EmployeesCount, @OMS, @ActiveProjects, @FinancialId, @FinancialPlatform, @HRId, @HRSystem, @SSO, @TestSite, @RefreshDate, @Logo, @Address1, @Address2, @City, @Zip, @Country, @State, @LGOwner, @EmployeeGroupsId, @EmployeeGroupsName, @AddressLngLat`);
    await ps.execute(customerSchema);
    await ps.unprepare();

    res.send({
      result: "Saved"
    });
  } catch ({ message }) {
    res.status(500).send({ message });
  }
});

router.post("/customers/del", requireJwtAuth, requireScope, ((req, res, next) => req.user.scope !== scopes.ADMIN ? res.send({ message: "permission denied." }) : next()), async (req, res) => {
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
    await ps.unprepare();

    res.send({
      result
    });
  } catch ({ message }) {
    res.status(500).send({ message });
  }
});

module.exports = router;
