const { createWebsite, generateApiKey } = require("../services/website.service");
const Website = require("../models/website.model");

exports.createWebsite = async (req, res, next) => {
    try {
        const {name, domain} = req.body;

        const website = await createWebsite(name, domain, req.user.id);
        res.status(201).json({ message: "Website Created", website });
    } catch(err) {
        next(err);
    }
};

exports.createApiKey = async(req, res, next) => {
    try {
        const { websiteId } = req.body;
        const rawKey = await generateApiKey(websiteId);
        res.status(201).json({
            message: "API key generated.",
            apiKey: rawKey,
        });
    } catch(err){
        next(err);
    }
};

exports.getWebsites = async (req, res, next) => {
  try {
    const websites = await Website.find({ owner: req.user.id });

    res.json({
      websites
    });

  } catch (err) {
    next(err);
  }
};