const mongoose = require('mongoose');

const failureSchema = new mongoose.Schema(
    {
        website: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Website",   //which website produce the failure
            required: true,
            index: true
        },

        message: {
            type: String,
            required: true
        },

        fingerprint: {    //identifies similar failures; system groups them
            type: String,
            index: true
        },

        severity: {   
            type: String,
            default: "unknown"
        },

        service: {      //which system produced failure.
            type: String,
            index: true
        },

        metadata: {     //Extra data object.
            type: Object
        },

        source: {       //where failure came from.
            type: String,
            default: "external"
        }
    },
    { timestamps: true }
);

failureSchema.index({ createdAt: -1 });         //show latest failures
failureSchema.index({ website: 1, createdAt: -1 });         //show failures per website
failureSchema.index({ fingerprint: 1, createdAt: -1 });     //helps in similarity detection system.

module.exports = mongoose.model("Failure", failureSchema);