const express = require('express');
const router = express.Router();

const { createFailure, getFailures } = require("../controllers/failure.controller");
const { apiKeyMiddleware } = require("../middlewares/apiKey.middleware");
const { failureLimiter } = require("../middlewares/rateLimit.middleware");
const { authMiddleware } = require("../middlewares/auth.middleware");

router.post(
    "/failures", 
    apiKeyMiddleware, 
    failureLimiter, 
    createFailure
);

router.get(
  "/failures",
  authMiddleware,
  getFailures
);

module.exports = router;