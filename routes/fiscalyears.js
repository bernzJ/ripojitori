const express = require("express");
const router = express.Router();
const Joi = require("@hapi/joi");
const sql = require('mssql/msnodesqlv8');

const scopes = require("../constants/scopes.json");
const requireJwtAuth = require("../middleware/requireJwtAuth");
const requireScope = require("../middleware/requireScope");


router.use((req, res, next) => {
  req.scope = scopes.PLEB;
  next();
});

router.post("/fiscalyears/create", requireJwtAuth, requireScope, ((req, res, next) => req.user.scope <= scopes.PLEB ? res.send({ message: "permission denied." }) : next()), async (req, res) => {
  const ps = new sql.PreparedStatement();
  try {
    const user = req.user;
    const { fiscalyear } = req.body;
    const schema = Joi.object({
      FiscalYearId: Joi.number().default(-1),
      FiscalYearBegin: Joi.date(),
      FiscalYearEnd: Joi.date(),
      FiscalYearMonthEndClosePeriod: Joi.date(),
      FiscalYearQuarterlyCloseCycle: Joi.date()
    });

    const fiscalyearSchema = await schema.validateAsync(fiscalyear);

    ps.input('FiscalYearId', sql.Int);
    ps.input('FiscalYearBegin', sql.DateTime);
    ps.input('FiscalYearEnd', sql.DateTime);
    ps.input('FiscalYearMonthEndClosePeriod', sql.DateTime);
    ps.input('FiscalYearQuarterlyCloseCycle', sql.DateTime);

    await ps.prepare(`EXEC [dbo].[update_fiscalyear] @FiscalYearId, @FiscalYearBegin, @FiscalYearEnd, @FiscalYearMonthEndClosePeriod, @FiscalYearQuarterlyCloseCycle`);
    const { recordset } = await ps.execute(fiscalyearSchema);

    await ps.unprepare();
    res.send(recordset[0]);
  } catch ({ message }) {
    res.status(500).send({ message });
  }
});

module.exports = router;