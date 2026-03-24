const mongoose = require('mongoose');

const apiKeySchema = new mongoose.Schema(
    {
        keyHash: {
            type: String,
            required: true,
        },
        website: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Website",   //api key belongs to a website
            required: true,
        },
        isActive: {    //used to disable compromised keys; isActive = false => SDK requests will be rejected.
            type: Boolean,
            default: true,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("ApiKey", apiKeySchema);