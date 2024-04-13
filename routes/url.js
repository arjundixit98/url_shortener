const express = require("express");
const router = express.Router();

const {
  handleGenerateNewShortURL,
  handleRedirectToActualURL,
  handleGetVisitCounts,
} = require("../controllers/url");

router.post("/", handleGenerateNewShortURL);

router.get("/:shortId", handleRedirectToActualURL);

router.get("/count/:shortId", handleGetVisitCounts);

module.exports = router;
