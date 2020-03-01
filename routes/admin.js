const express = require("express");
const router = express.Router();

const scopes = require("../constants/scopes.json");
const requireJwtAuth = require("../middleware/requireJwtAuth");
const requireScope = require("../middleware/requireScope");

router.use((req, res, next) => {
  req.scope = scopes.ADMIN;
  next();
})

router.post("/admin/users", requireJwtAuth, requireScope, (req, res) => {
  res.send({
    user: {
      displayName:
        req.user.firstName
    }
  });
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
