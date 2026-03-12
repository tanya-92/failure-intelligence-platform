const Failure = require("../models/failure.model");

const createFailure = async (payload, websiteId) => {
    const failure = await Failure.create({     //creating a failure record 
        ...payload,
        website: websiteId
    });

    return failure;
}

const getFailuresByWebsite = async (websiteId, limit = 50) => {
    return await Failure.find({ website: websiteId })
    .sort({ createdAt: -1 })
    .limit(limit);
};

module.exports = { createFailure, getFailuresByWebsite };


// payload: contains error data sent by the client
// websiteId: Every error belongs to a website, so this tells which which website produced the failure.