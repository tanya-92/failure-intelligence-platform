const express = require("express");
const router = express.Router();
const websiteController = require("../controllers/website.controller");
const { authMiddleware } = require("../middlewares/auth.middleware");

router.post("/",authMiddleware, websiteController.createWebsite);
router.post("/apiKey", authMiddleware, websiteController.createApiKey);
router.get("/", authMiddleware, websiteController.getWebsites);

module.exports = router;