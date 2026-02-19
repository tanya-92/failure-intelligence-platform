const helmet = require("helmet");
const cors = require("cors");

const securityMiddleware = [
    helmet(),           //Adding security HTTP headers
    cors({
        origin: false,  //Currently blocks all cross-origin requests
    }),
];

module.exports = {securityMiddleware};