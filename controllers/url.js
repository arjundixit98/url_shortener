const URL = require("../models/url");
const shortid = require("shortid");

const handleGenerateNewShortURL = async (req, res) => {
  if (!req.body) res.status(400).json({ error: "url is required" });

  const shortId = shortid.generate();
  const result = await URL.create({
    shortId: shortId,
    redirectURL: req.body.url,
    visitHistory: [],
    createdBy: req.user._id,
  });

  res.render("home", { shortId });
};

const handleRedirectToActualURL = async (req, res) => {
  const result = await URL.findOneAndUpdate(
    {
      shortId: req.params.shortId,
    },
    {
      $push: { visitHistory: { timestamp: Date.now() } },
    }
  );
  res.redirect(result.redirectURL);
};

const handleGetVisitCounts = async (req, res) => {
  const result = await URL.findOne({
    shortId: req.params.shortId,
  });
  res.status(200).json({
    totalClicks: result.visitHistory.length,
    analytics: result.visitHistory,
  });
};

module.exports = {
  handleGenerateNewShortURL,
  handleRedirectToActualURL,
  handleGetVisitCounts,
};
