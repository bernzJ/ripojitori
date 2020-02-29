const express = require("express");
const router = express.Router();
const passport = require("passport");
const jwt = require("jsonwebtoken");
const Joi = require("@hapi/joi");

const keys = require("../config/keys");
const User = require("../models/User");
const requireLocalAuth = require("../middleware/requireLocalAuth");

tokenFromUser = user => {
  const token = jwt.sign({}, keys.secretOrKey, {
    expiresIn: "12h",
    subject: user.id
  });
  return token;
};

//local login
router.post("/auth/login", requireLocalAuth, (req, res) => {
  const token = tokenFromUser(req.user);
  res.cookie("x-auth-cookie", token);
  res.json({ token });
});

// logout
router.get("/auth/logout", (req, res) => {
  req.logout();
  res.send(false);
});

module.exports = router;
