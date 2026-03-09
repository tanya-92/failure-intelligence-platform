const Failure = require("../models/failure.model");

const createFailure = async (payload, websiteId) => {
    const failure = await Failure.create({     //creating a failure record 
        ...payload,
        website: websiteId
    });

    return failure;
}

module.exports = { createFailure };


// payload: contains error data sent by the client
// websiteId: Every error belongs to a website, so this tells which which website produced the failure.