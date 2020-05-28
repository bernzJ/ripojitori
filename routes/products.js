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

router.post("/products", requireJwtAuth, requireScope, async (req, res, next) => {
  try {
    const ps = new sql.PreparedStatement();
    const { Id } = req.body;

    const schema = Joi.object({
      Id: Joi.number()
        .required()
    });

    const productSchema = await schema.validateAsync({ Id });

    ps.input('Id', sql.Int);

    await ps.prepare(`EXEC [dbo].[get_products] @Id`);
    const result = await ps.execute(productSchema);
    await ps.unprepare();

    res.send({
      products: result.recordset[0]
    });
  } catch ({ message }) {
    res.status(500).send({ message });
  }
});

router.post("/products/create", requireJwtAuth, requireScope, ((req, res, next) => req.user.scope <= scopes.PLEB ? res.send({ message: "permission denied." }) : next()), async (req, res) => {
  const ps = new sql.PreparedStatement();
  try {

    const { Product } = req.body;
    const schema = Joi.object({
      ConcurProductId: Joi.number()
        .default(-1),
      CustomerId: Joi.number()
        .required(),
      Id: Joi.number()
        .default(-1),
      ProductId: Joi.number()
        .default(-1),
      Product: Joi.string()
        .required(),
      SegmentId: Joi.number()
        .default(-1),
      SegmentName: Joi.string()
        .default(''),
    });
    const productSchema = await schema.validateAsync(Product);
    // ps.input('Id', sql.Int);
    ps.input('ConcurProductId', sql.Int);
    ps.input('CustomerId', sql.Int);
    ps.input('Id', sql.Int);
    ps.input('ProductId', sql.Int);
    ps.input('Product', sql.NVarChar(255));
    ps.input('SegmentId', sql.Int);
    ps.input('SegmentName', sql.NVarChar(50));

    // await Company.updateOne({ _id }, companySchema, { upsert: true });
    await ps.prepare(`EXEC [dbo].[update_products] @ConcurProductId, @CustomerId, @Id, @ProductId, @Product, @SegmentId, @SegmentName`);
    await ps.execute(productSchema);
    await ps.unprepare();

    res.send({
      result: "Saved"
    });
  } catch ({ message }) {
    res.status(500).send({ message });
  }
});

module.exports = router;
