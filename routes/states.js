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

router.post("/states", requireJwtAuth, requireScope, async (req, res) => {
  try { 
    /*
    const ps = new sql.PreparedStatement();
    const { Id } = req.body;

    const schema = Joi.object({
      Id: Joi.number().default(0),
    });

    const stateSchema = await schema.validateAsync({ Id });
    ps.input('Id', sql.Int);
  
    await ps.prepare(`SELECT * FROM [dbo].[States] WHERE [dbo].[States].[CountryId] IN (0, @Id) FOR JSON AUTO;`);
    */
    const { recordset } = await new sql.Request().query(`SELECT * FROM [dbo].[States] FOR JSON AUTO;`);
    res.send({
      states: recordset[0]
    });
  } catch ({ message }) {
    res.status(500).send({ message });
  }
});

module.exports = router;