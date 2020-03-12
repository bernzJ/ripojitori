const express = require("express");
const router = express.Router();
const Joi = require("@hapi/joi");

const scopes = require("../constants/scopes.json");
const requireJwtAuth = require("../middleware/requireJwtAuth");
const requireScope = require("../middleware/requireScope");
const Company = require("../models/Company");

// @NOTE: unsafe way of scoping from routes.
router.use((req, res, next) => {
  //console.log(req.path);
  req.scope = scopes.PLEB;
  next();
});

router.post("/api/companies", requireJwtAuth, requireScope, async (req, res) => {
  try {
    const companies = await Company.find({}, `-_v ${req.user.scope === scopes.ADMIN ? "" : "-scope"}`);
    res.send({
      companies
    });
  } catch ({ message }) {
    res.send({ message })
  }
});

router.post("/api/companies/create", requireJwtAuth, requireScope, ((req, res, next) => req.user.scope <= scopes.PLEB ? res.send({ message: "permission denied." }) : next()), async (req, res) => {
  try {
    const user = req.user;
    const { company } = req.body;
    const schema = Joi.object({
      _id: Joi.string()
        .required(),
      name: Joi.string()
        .required(),
      clientName: Joi.string()
        .required(),
      clientType: Joi.string()
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
    const { _id } = companySchema;
    delete companySchema._id;

    if (user.scope !== scopes.ADMIN) {
      //delete companySchema.scope;
      companySchema.scope = 0;
    }
    await Company.updateOne({ _id }, companySchema, { upsert: true });
    res.send({
      result: "Saved"
    });
  } catch ({ message }) {
    res.send({ message })
  }
});

router.post("/api/companies/del", requireJwtAuth, requireScope, ((req, res, next) => req.user.scope !== scopes.ADMIN ? res.send({ message: "permission denied." }) : next()), async (req, res) => {
  try {
    const { companies } = req.body;
    const result = await Company.deleteMany({ _id: companies });
    res.send({
      result
    });
  } catch ({ message }) {
    res.send({ message })
  }
});

module.exports = router;
