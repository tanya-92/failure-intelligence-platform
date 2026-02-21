const crypto = require('crypto');
const bcrypt = require('bcryptjs');

const Website = require('../models/website.model');
const ApiKey = require('../models/apiKey.model');

const createWebsite = async (name, domain, ownerId) => {
    const website = await Website.create({
        name,
        domain,
        owner: ownerId,
    });
    return website;
}

const generateApiKey = async (websiteId) => {
    const rawKey = crypto.randomBytes(32).toString("hex");
    
    const hashedKey = await bcrypt.hash(rawKey,10);

    await ApiKey.create({
        keyHash: hashedKey,
        website: websiteId,
    });

    return rawKey;
};

module.exports = { createWebsite, generateApiKey };