'use strict';

const Hapi = require('@hapi/hapi'),
    { Client } = require('pg');

const init = async () => {

    const server = Hapi.server({
        port: 5000,
        host: 'localhost'
    });

    const client = new Client({
        user: 'postgres',
        host: 'localhost',
        database: 'postgres',
        password: 'poltrona',
        port: 5432 ,    
    })

    await client.connect()

    const date = await new Promise(resolve => {
        client.query('SELECT NOW()', (err, res) => {
            client.end()
            resolve(res);
        })
    });

    server.route({
        method: 'GET',
        path:'/',
        handler: (request, h) => {

            return 'Hello World!' + date.rows[0].now;
        }
    });

    await server.start();
    console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {

    console.log(err);
    process.exit(1);
});

init();