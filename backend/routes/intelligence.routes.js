const express = require("express");
const router = express.Router();

const { getFailurePatterns } = require("../services/intelligence.service");

router.get("/patterns/:websiteId", async (req, res, next) => {
  try {
    const data = await getFailurePatterns(req.params.websiteId);
    res.json(data);
  } catch (err) {
    next(err);
  }
});

module.exports = router;