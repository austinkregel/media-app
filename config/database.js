module.exports = {
    connection: process.env.DB_CONNECTION || 'mysql',

    pgsql: {
        client: 'pg',
        connection: {
            host: process.env.DB_HOST || '127.0.0.1',
            user: process.env.DB_USERNAME || 'root',
            password: process.env.DB_PASSWORD || 'secret',
            database: process.env.DB_DATABASE || 'fringe',
        }
    },

    mysql: {
        client: 'mysql',
        connection: {
            host: process.env.DB_HOST || '127.0.0.1',
            user: process.env.DB_USERNAME || 'root',
            password: process.env.DB_PASSWORD || 'secret',
            database: process.env.DB_DATABASE || 'fringe',
            charset: process.env.DB_CHARSET || 'utf8'
        }
    },
    mssql: {
        client : 'mssql',
        connection: {
            database: process.env.DB_DATABASE || 'fringe',
            server: process.env.DB_HOST || 'fringe.database.windows.net',
            user: process.env.DB_USERNAME || 'root',
            password: process.env.DB_PASSWORD || 'secret',
            port: process.env.DB_PORT || 1433,
            connectionTimeout: process.env.DB_TIMEOUT || 30000,
            options: {}
        }
    },

    sqlite: {
        client: 'sqlite3',
        connection: {
            filename: "./fringe.sqlite"
        }
    }
};