const middlewareWithAuthenticatedRedirect = [ app.make('middleware.guest') ].concat(app.make('middleware.web'));

/**
 * @param {Router} router
 */
module.exports = (router) => {
	// The middleware isn't binding for some reason...?
	router.post('/login', app.controller('Auth/LoginController', 'store'), middlewareWithAuthenticatedRedirect);
	router.get('/login', app.controller('Auth/LoginController', 'index'), middlewareWithAuthenticatedRedirect);
	router.get('/register', app.controller('Auth/RegisterController', 'create'), middlewareWithAuthenticatedRedirect);
	router.post('/register', app.controller('Auth/RegisterController', 'store'), middlewareWithAuthenticatedRedirect);

	router.get('/api/genres', app.controller('Api/GenresController', 'index'));
	router.get('/api/files', app.controller('Api/FileController', 'index'));
	router.get('/api/file/:id', app.controller('Api/FileController', 'showFiles'));
	router.get('/api/files/:id', app.controller('Api/FileController', 'show'));
	router.put('/api/files/:id', app.controller('Api/FileController', 'update'));

	router.express.get('/api/media/:id', app.controller('Api/MediaController', 'show'));
	router.get('/api/search/:query', app.controller('Api/FileController', 'search'));

	router.get({
		path: '/:route?/:id?',
		middleware: app.make('middleware.auth'),
		resource: app.controller('HomeController', 'spaRoute')
	});
};
