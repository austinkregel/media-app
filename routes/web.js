const middlewareWithAuthenticatedRedirect = [app.make('middleware.guest')].concat(app.make('middleware.web'));
/**
 * @param {Router} router
 */
module.exports = (router) => {
    // The middleware isn't binding for some reason...?
    router.get({
        path: '/',
        middleware: app.make('middleware.auth'),
        resource: app.controller('WelcomeController', 'index'),
    });

    router.get({
        path: '/home',
        middleware: app.make('middleware.auth'),
        resource: app.controller('HomeController', 'index'),
    });
    router.get({
        path: '/player/:id',
        middleware: app.make('middleware.auth'),
        resource: app.controller('HomeController', 'player'),
    });

    router.post('/login', app.controller('Auth/LoginController', 'store'), middlewareWithAuthenticatedRedirect);
    router.get('/login', app.controller('Auth/LoginController', 'index'), middlewareWithAuthenticatedRedirect);
    router.get('/register', app.controller('Auth/RegisterController', 'create'), middlewareWithAuthenticatedRedirect);
    router.post('/register', app.controller('Auth/RegisterController', 'store'), middlewareWithAuthenticatedRedirect);
}
