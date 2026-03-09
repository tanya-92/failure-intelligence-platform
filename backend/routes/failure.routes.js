const express = require('express');
const router = express.Router();

const { createFailure } = require("../controllers/failure.controller");
const { apiKeyMiddleware } = require("../middlewares/apiKey.middleware");
const { failureLimiter } = require("../middlewares/rateLimit.middleware");

router.post("/failures", apiKeyMiddleware, failureLimiter, createFailure);

module.exports = router;