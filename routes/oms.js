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

router.post("/OMS", requireJwtAuth, requireScope, async (req, res, next) => {
  try {
    //SELECT _id, projectResource, clientName, segment, category, status, hours, start, "end"${req.user.scope === scopes.ADMIN ? ", scope" : ""} FROM companies FOR JSON AUTO;
    const result = await new sql.Request().query(`SELECT * FROM [dbo].[OMS] FOR JSON AUTO;`);
    res.send({
      oms: result.recordset[0]
    });
  } catch ({ message }) {
    res.status(500).send({ message });
  }
});

module.exports = router;