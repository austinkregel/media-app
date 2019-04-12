const { RateLimiterMemory } = require('rate-limiter-flexible');
const crypto = app.make('crypto');

const MAX_REQUESTS_PER_SECOND = 400000;

const rateLimiter = new RateLimiterMemory({
    points: MAX_REQUESTS_PER_SECOND,
    duration: 1,
});

module.exports = (req, res, next) => {
    let identifier = req.ip;

    if ((req.session || {}).hasOwnProperty('user')) {
        identifier = req.ip + '|' + req.session.user.id;
    }

    let identifierHash = crypto.createHash('sha1').update(identifier).digest('hex');

    rateLimiter.consume(identifierHash, 1)
        .then((limit) => {
            res.setHeader('X-RateLimit-Limit', MAX_REQUESTS_PER_SECOND);
            res.setHeader('X-RateLimit-Remaining', limit.remainingPoints);
            next();
        })
        .catch((limit) => {
            res.setHeader('X-RateLimit-Limit', MAX_REQUESTS_PER_SECOND);
            res.setHeader('X-RateLimit-Remaining', limit.remainingPoints);
            res.setHeader('Retry-After', Math.round(limit.msBeforeNext / 1000));
            res.status(429).json({message: 'Too Many Requests'});
        });
}