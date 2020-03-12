const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");

const keys = require("../config/keys");
const User = require("../models/User");
const requireLocalAuth = require("../middleware/requireLocalAuth");

const tokenFromUser = user => {
  const token = jwt.sign({}, keys.secretOrKey, {
    expiresIn: "12h",
    subject: user._id.toString()
  });
  return token;
};

// @TODO: remove this in prod.
router.get("/auth/register", async (req, res) => {
  try {
    console.log(req.query);
    const { email, password, firstName, lastName, scope } = req.query;
    await new User({
      email,
      password,
      firstName,
      lastName,
      scope
    }).registerUser();
    res.send({ registerSuccess: true });
  } catch ({ message }) {
    res.send({ message });
  }
});

//local login
router.post("/auth/login", requireLocalAuth, (req, res) => {
  const token = tokenFromUser(req.user);
  delete req.user._id;
  // res.cookie("x-auth-cookie", token);
  res.json({ user: { ...req.user, token } });
});

// logout
router.post("/auth/logout", (req, res) => {
  req.logout();
  res.send(false);
});

module.exports = router;
