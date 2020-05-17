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

router.post("/notes", requireJwtAuth, requireScope, async (req, res, next) => {
  try {

    const ps = new sql.PreparedStatement();
    const { Id } = req.body;

    const schema = Joi.object({
      Id: Joi.number().required()
    });

    const notesSchema = await schema.validateAsync({ Id });
    ps.input('Id', sql.Int);

    await ps.prepare(`SELECT * FROM [dbo].[Notes] WHERE Id = @Id;`);

    const { recordset } = await ps.execute(notesSchema);
    res.send({
      notes: recordset[0]
    });
  } catch ({ message }) {
    res.status(500).send({ message });;
  }
});

router.post("/notes/create", requireJwtAuth, requireScope, async (req, res, next) => {
  try {

    const ps = new sql.PreparedStatement();
    const { Notes } = req.body;

    const schema = Joi.object({
      Id: Joi.number().default(-1),
      CustomerId: Joi.number().required(),
      Note: Joi.string().max(4000).allow('', null),
      SqlReport: Joi.string().max(4000).allow('', null)
    });

    const notesSchema = await schema.validateAsync(Notes);
    ps.input('Id', sql.Int);
    ps.input('CustomerId', sql.Int);
    ps.input('Note', sql.NVarChar(4000));
    ps.input('SqlReport', sql.NVarChar(4000));

    await ps.prepare(`EXEC [dbo].[update_notes] @Id, @CustomerId, @Note, @SqlReport`);

    await ps.execute(notesSchema);
    res.send({ result: 'saved !' });
  } catch ({ message }) {
    res.status(500).send({ message });;
  }
});

module.exports = router;