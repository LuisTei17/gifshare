'use strict';

const Hapi = require('@hapi/hapi'),
    routes = require('./config/routes/routes'),
    Db = require('./config/database/postgres');

const init = async () => {

    const server = Hapi.server({
        port: 5000,
        host: 'localhost',
        routes: {
            cors: true
        }
    }),
        database = new Db();
        global.database = await database.connect();
    
    await server.register(require('@hapi/inert'));

    await routes.mountRoutes(server);

    await server.start();
    console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {

    console.log(err);
    process.exit(1);
});

init();