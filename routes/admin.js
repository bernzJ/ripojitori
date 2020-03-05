const express = require("express");
const router = express.Router();

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
    const users = await User.find({});
    res.send({
      users
    });
  } catch ({ message }) {
    res.send({ message })
  }
});

router.post("/admin/users/create", requireJwtAuth, requireScope, async (req, res) => {
  try {
    const { user, user: { email } } = req.body;
    const result = await User.updateOne({ email: email }, user, { upsert: true });
    res.send({
      result
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

router.post("/api/feature", requireJwtAuth, (req, res) => {
  res.send({
    feature: "This is a feature. Only authenticated users can see this."
  });
});

router.post("/api/profile", requireJwtAuth, (req, res) => {
  res.send({
    profile: {
      provider: req.user.provider,
      displayName:
        req.user.firstName,
      email: req.user.email
    }
  });
});

module.exports = router;
