// Prevents API abuse or flooding

const rateLimit = require('express-rate-limit');

const failureLimiter = rateLimit({
    windowMs: 60 * 1000,
    max: 100,       // 100 requests per minute
    message: "Too many failure events"
});

module.exports = { failureLimiter };