const Failure = require("../models/failure.model");

const createFailure = async (payload, websiteId) => {
    const failure = await Failure.create({
        ...payload,
        website: websiteId
    });

    return failure;
}

module.exports = { createFailure };