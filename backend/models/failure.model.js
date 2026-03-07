const mongoose = require('mongoose');

const failureSchema = new mongoose.Schema(
    {
        website: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Website",
            required: true
        },

        message: {
            type: String,
            required: true
        },

        severity: {
            type: String,
            default: "unknown"
        },

        service: {
            type: String
        },

        metadata: {
            type: Object
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model("Failure", failureSchema);