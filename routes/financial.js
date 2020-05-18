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

router.post("/financial/create", requireJwtAuth, requireScope, ((req, res, next) => req.user.scope <= scopes.PLEB ? res.send({ message: "permission denied." }) : next()), async (req, res) => {
  const ps = new sql.PreparedStatement();
  try {
    const user = req.user;
    const { financial } = req.body;
    const schema = Joi.object({
      FinancialId: Joi.number().default(-1),
      FinancialPlatform: Joi.string().max(50)
    });

    const Financialschema = await schema.validateAsync(financial);

    ps.input('FinancialId', sql.Int);
    ps.input('FinancialPlatform', sql.NVarChar(50));

    await ps.prepare(`EXEC [dbo].[update_financial] @FinancialId, @FinancialPlatform`);
    const { recordset } = await ps.execute(Financialschema);

    await ps.unprepare();
    res.send(recordset[0]);
  } catch ({ message }) {
    res.status(500).send({ message });
  }
});

module.exports = router;