
const rateLimit = require('express-rate-limit');

// Import configuration file
const config = require('../config/config.json')

const rateLimiterMiddleware = rateLimit({

    // 1 min in milliseconds
    windowMs: config.rate_limit_ms,

    // max allowed requests in 1 minute
    max: config.rate_limit_max,

    // use standard headers 
    standardHeaders: true,

    // customized error messagemessage: 'You have exceeded the maximum requests in 1 min limit!',
    message: 'You have exceeded the maximum requests in 1 min limit!',

    // do not use legacy headers
    legacyHeaders: false,

})





//Export the functions for use in other parts of the application
module.exports = rateLimiterMiddleware;