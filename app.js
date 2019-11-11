require('dotenv').config()
require('fringejs');
app.closeActions = [];

require('./bootstrap/helpers');

const Config = app.make('Config');

/*-----------------------------------------------------------------
 * Generally we're going to configure our own config directory
 * since we can change where we want to put the config directory.
 *-----------------------------------------------------------------
 */
app.config = Config.register(app.base_path('/config'));

require('./bootstrap/bootstrap')

/*-----------------------------------------------------------------
 * Build the providers from the configuration files so we can
 * ensure that all the local systems are loaded.
 * -----------------------------------------------------------------
 */
app.register(app.config.app.providers || []);

app.close = () => {
    app.closeActions.map(closure => closure());
}

process.stdin.resume()
