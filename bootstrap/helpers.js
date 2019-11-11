app.base_path = (...paths) => {
    return app.make('path').join(__dirname, '..', ...paths);
};

app.resource_path = (...paths) => app.base_path('resources', ...paths);

app.storage_path = (...paths) => app.base_path('storage', ...paths);

app.public_path = (...paths) => app.base_path('public', ...paths);

app.controller = (namespace, method) => {
    let controller = require(app.base_path('app/Http/Controllers', namespace));
    try {
        controller = new controller()
        // If it's a controller, we want to give it back it's context... Otherwise it's all messed up
        return controller[method].bind(controller);
    } catch (notAClassError) {
        return controller[method]
    }
}

app.url = (...paths) => app.config.app.url_schema + app.make('path').join(app.config.app.url, ...paths);

let edge = app.make('edge.js')
edge.registerViews(app.resource_path('views'));
app.view = edge.share(require('./view_helpers'))

// Add some PHP Style file helpers to get around the pesky encoding requirements, and to just make easier names...
app.fs =  {
    file_exists: (path) => app.make('fs').existsSync(path),
    file_not_exists: (path) => !app.make('fs').existsSync(path),
    file_get_contents: (path) => app.make('fs').readFileSync(path, 'UTF-8')
}
app.require = (path) => require(app.base_path(path));

app.wants_json = (req) => {
    let acceptJson = req.headers.accept === 'application/json' || false;
    let contentJson = req.headers['content-type'] === 'application/json' || false;

    return acceptJson || contentJson;
}

app.resolveObject = function(o, s) {
    s = s.replace(/\[(\w+)\]/g, '.$1'); // convert indexes to properties
    s = s.replace(/^\./, '');           // strip a leading dot
    var a = s.split('.');
    for (var i = 0, n = a.length; i < n; ++i) {
        var k = a[i];
        if (k in o) {
            o = o[k];
        } else {
            return;
        }
    }
    return o;
}

