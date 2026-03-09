const { createFailure } = require("../services/failure.service");

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