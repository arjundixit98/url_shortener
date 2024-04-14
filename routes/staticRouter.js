const express = require("express");
const router = express.Router();
const URL = require("../models/url");

router.get("/", async (req, res) => {
  if (!req.user) return res.redirect("/login");

  const allUrls = await URL.find({ createdBy: req.user._id });

  res.render("home", { urls: allUrls });
});

router.get("/login", async (req, res) => {
  res.render("login");
});

router.get("/signup", async (req, res) => {
  res.render("signup");
});

module.exports = router;
