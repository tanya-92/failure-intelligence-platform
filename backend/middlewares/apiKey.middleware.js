const bcrypt = require('bcrypt');
const ApiKey = require("../models/apiKey.model");

module.exports.apiKeyMiddleware = async(req, res, next) => {
    const apiKey = req.headers["x-api-key"];   //extarcts x-api key from headers

    if(!apiKey) {
        return res.status(401).json({ message: "API key required" });
    }

    const keys = await ApiKey.find({ isActive: true }).populate("website");

    for(let key of keys){
        const match = await bcrypt.compare(apiKey, key.keyHash);   //database stores hashed API key, not the real one

        if(match){
            req.website = key.website;    //This stores website info in request
            return next();
        }
    }

    return res.status(401).json({ message: "Invalid API key" });
};