const { createFailure, getFailuresByWebsite } = require("../services/failure.service");

exports.createFailure = async (req, res, next) => {
    try {
        const failure = await createFailure(req.body, req.website._id);

        res.status(201).json({ 
            message: "Failure Recorded",
            failure
        });
    } catch(err){
        next(err);
    }
};

exports.getFailures = async (req, res, next) => {
    try {
        const failures = await getFailuresByWebsite(req.query.websiteId);

        res.json({
            count: failures.length,
            failures
        });
    } catch(err) {
        next(err);
    }
};