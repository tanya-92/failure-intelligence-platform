const mongoose = require('mongoose');

const apiKeySchema = new mongoose.Schema(
    {
        keyHash: {
            type: String,
            required: true,
        },
        website: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Website",
            required: true,
        },
        isActive: {
            type: Boolean,
            default: true,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("ApiKey", apiKeySchema);