/*---------------------------------------------------------------------------------------
 * This is going to "use" the express session middleware... but also will just fake it...
 * It's just meant to be an example at the moment until I get a more solid idea of how I
 * want this whole app thing to work.
 * --------------------------------------------------------------------------------------
 */
module.exports = (req, res, next) => {
    let session = req.session || {};

    if (!session.user) {
        if (app.wants_json(req)) {
            return res.json({
                error: 'Unauthenticated'
            })
        }

        return res.redirect('/login');
    }

    app.view = app.view.share(Object.assign(require(app.base_path('./bootstrap/view_helpers')), {
        user: session.user
    }))

    next();
}