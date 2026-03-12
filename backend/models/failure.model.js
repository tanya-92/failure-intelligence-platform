const mongoose = require('mongoose');

const failureSchema = new mongoose.Schema(
    {
        website: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Website",
            required: true,
            index: true
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
            type: String,
            index: true
        },

        metadata: {
            type: Object
        },

        source: {
            type: String,
            default: "external"
        }
    },
    { timestamps: true }
);

failureSchema.index({ createdAt: -1 });
failureSchema.index({ website: 1, createdAt: -1 });

module.exports = mongoose.model("Failure", failureSchema);