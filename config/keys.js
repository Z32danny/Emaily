// keys.js - figure out what set of credentials to return

if (process.env.NODE_ENV === 'production') {
    // we are in production - return the prod set of keys
    // pull in keys from /prod, then pass them over to whomever is asking (keys.js)
    module.exports = require('./prod');
} else {
    // we are in development - return the dev keys
    // pull in keys from /dev, then pass them over to whomever is asking (keys.js)
    module.exports = require('./dev');
}