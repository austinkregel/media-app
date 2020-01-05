require('dotenv').config();
require('fringejs');

require('./bootstrap/helpers');

const Config = app.make('Config');

/*-----------------------------------------------------------------
 * Generally we're going to configure our own config directory
 * since we can change where we want to put the config directory.
 *-----------------------------------------------------------------
 */
app.config = Config.register(app.base_path('/config'));

module.exports = app.config.database[app.config.database.connection];
