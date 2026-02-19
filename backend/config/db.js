const mongoose = require("mongoose");

const connectDB = async() => {
    try {
        await mongoose.connect(process.env.DB_URI);
        console.log("Database connected");
    } catch(err) {
        console.log("DB connection failed");
        process.exit(1);
    }
};

module.exports = { connectDB };