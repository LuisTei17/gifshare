const glob = require('glob'),
    componentsPath = 'server/components/**/*Routes.js'

exports.mountRoutes = async (server) => {
    await new Promise(resolve => {
        glob(componentsPath, {}, (err, files) => {
            const routesInFile = files.map(file => {
                const routes = require(process.cwd() + '/' + file);

                routes.forEach(route => {
                    server.route(route)
                });
            });
            resolve();
        });
    });
};