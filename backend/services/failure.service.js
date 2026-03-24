const Failure = require("../models/failure.model");
const { generateFingerprint } = require("../utils/fingerprint");

const createFailure = async (payload, websiteId) => {

    const message = payload.message || "unknown error";
    const failure = await Failure.create({
        website: websiteId,
        message,
        fingerprint: generateFingerprint(message),
        severity: payload.severity,
        service: payload.service,
        metadata: payload.metadata,
        source: payload.source
    });
    return failure;
};

const getFailuresByWebsite = async (websiteId, limit = 50) => {
    return await Failure.find({ website: websiteId })
    .sort({ createdAt: -1 })
    .limit(limit);
};

module.exports = { createFailure, getFailuresByWebsite };


// payload: contains error data sent by the client
// websiteId: Every error belongs to a website, so this tells which which website produced the failure.