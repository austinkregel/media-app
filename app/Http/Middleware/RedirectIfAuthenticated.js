/*---------------------------------------------------------------------------------------
 * This is going to "use" the express session middleware... but also will just fake it...
 * It's just meant to be an example at the moment until I get a more solid idea of how I
 * want this whole app thing to work.
 * --------------------------------------------------------------------------------------
 */
module.exports = (req, res, next) => {
    let session = req.session || {};

    if (session.user) {
        return res.redirect('/');
    }

    next();
}
