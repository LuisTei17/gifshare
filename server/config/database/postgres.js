const { Client } = require('pg');

class Database {

    constructor() {

        this.connect = async () => {
            const client = new Client({
                user: 'postgres',
                host: 'localhost',
                database: 'gifshare',
                password: 'poltrona',
                port: 5432,
            })
            await client.connect()
            this.client = client;
            return client;
        }
    }
}

module.exports = Database
