const mongoose = require("mongoose");
const websiteSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        domain: {
            type: String,
            required: true,
        },
        owner: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",  //creates a relationship: website belongs to this user.
            required: true,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Website", websiteSchema);