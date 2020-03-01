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
    subject: user._id.toString()
  });
  return token;
};

// @TODO: remove this in prod.
router.get("/auth/register", async (req, res) => {
  console.log(req.query);
  const { email, password, firstName, lastName, scope } = req.query;
  const newUser = await new User({
    email,
    password,
    firstName,
    lastName,
    scope
  });

  newUser.registerUser(newUser, (err, user) => {
    if (err) throw err;
    res.send({ registerSuccess: true });
  });
});

//local login
router.post("/auth/login", requireLocalAuth, (req, res) => {
  const token = tokenFromUser(req.user);
  delete req.user._id;
  // res.cookie("x-auth-cookie", token);
  res.json({ user: { ...req.user, token } });
});

// logout
router.get("/auth/logout", (req, res) => {
  req.logout();
  res.send(false);
});

module.exports = router;
