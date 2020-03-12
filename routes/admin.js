const express = require("express");
const router = express.Router();
const Joi = require("@hapi/joi");

const scopes = require("../constants/scopes.json");
const requireJwtAuth = require("../middleware/requireJwtAuth");
const requireScope = require("../middleware/requireScope");
const User = require("../models/User");

router.use((req, res, next) => {
  req.scope = scopes.ADMIN;
  next();
})

router.post("/admin/users", requireJwtAuth, requireScope, async (req, res) => {
  try {
    const users = await User.find({}, "-password");
    res.send({
      users
    });
  } catch ({ message }) {
    res.send({ message })
  }
});

router.post("/admin/users/create", requireJwtAuth, requireScope, async (req, res) => {
  try {
    const { user } = req.body;

    if (!user.password || user.password.length < 4) {
      delete user.password;
    }

    const schema = Joi.object({
      _id: Joi.string()
        .required(),
      email: Joi.string()
        .email()
        .required(),
      password: Joi.string()
        .min(5)
        .max(12).optional(),
      firstName: Joi.string()
        .required(),
      lastName: Joi.string()
        .required(),
      scope: Joi.number()
        .required()
    });
    const userSchema = await schema.validateAsync(user);
    const { _id } = userSchema;
    delete userSchema._id;

    if (userSchema.password) {
      userSchema.password = await User.hashPassword(userSchema.password);
    }
    await User.updateOne({ _id }, userSchema, { upsert: true });
    //const result = await User.updateOne({ email: email }, user, { upsert: true });
    res.send({
      result: "Saved"
    });
  } catch ({ message }) {
    res.send({ message })
  }
});

router.post("/admin/users/del", requireJwtAuth, requireScope, async (req, res) => {
  try {
    const { users } = req.body;
    const result = await User.deleteMany({ _id: users });
    res.send({
      result
    });
  } catch ({ message }) {
    res.send({ message })
  }
});

module.exports = router;
