let manifests = {};
module.exports = {
    url: app.url,
    mix: (path, manifestDirectory = '') => {
        if (!path.startsWith('/')) {
            path = '/' + path;
        }

        if (manifestDirectory && !manifestDirectory.startsWith('/')) {
            manifestDirectory = '/' + manifestDirectory
        }

        let hotFile = app.public_path(manifestDirectory + '/hot');

        if (app.fs.file_exists(hotFile)) {
            let url = app.fs.file_get_contents(hotFile);

            if (url.startsWith('http://') || url.startsWith('https://')) {
                return url.trim() + path;
            }

            return 'http://192.168.1.105:8080' + path;;
        }

        let manifestPath = app.public_path(manifestDirectory + '/mix-manifest.json');

        if (!manifests.hasOwnProperty(manifestPath)) {
            if (app.fs.file_not_exists(manifestPath)) {
                // Even if the manifest file doesn't exist we should just return the path passed through.
                return path;
            }

            manifests[manifestPath] = JSON.parse(app.fs.file_get_contents(manifestPath));
        }

        return manifestDirectory + manifests[path]
    },
    config(dotPath, default_) {
        let object = app.resolveObject(app.config, dotPath)

        if (object) {
            return object;
        }

        return default_;
    },
    route(routeName) {
        return Object.values(app.routes).map(route => app.resolveObject(route, routeName))
    },
}