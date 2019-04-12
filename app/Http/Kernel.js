const csrf = require('csurf')

/*-------------------------------------------------------------------------------------
 * Here you can pull in middleware from pretty much from anywhere. The only stipulation
 * is that the pulled middleware MUST be a function. Otherwise stuff just will not work
 * There are a few examples of things I thought could be useful... But that's up to you
 * ------------------------------------------------------------------------------------
 */

const middleware = {
    limit: require('./Middleware/RateLimitMiddleware'),
    authenticated: require('./Middleware/Authenticated'),
    guest: require('./Middleware/RedirectIfAuthenticated'),
    csrf: csrf({ cookie: true }),
}

module.exports = {
    web: [
        middleware.limit,
        middleware.csrf,
    ],

    auth: [
        middleware.limit,
        middleware.authenticated,
        middleware.csrf,
    ],

    api: [
        middleware.limit,
        middleware.authenticated
    ],

    ...middleware
}