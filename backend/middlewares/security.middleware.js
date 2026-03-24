const helmet = require("helmet");
const cors = require("cors");

const securityMiddleware = [  //an array because Express allows multiple middleware to be applied like this
    helmet(),           //Adding security HTTP headers; activate helmet
    cors({
        origin: false,  //Currently blocks all cross-origin requests
    }),
];

module.exports = {securityMiddleware};