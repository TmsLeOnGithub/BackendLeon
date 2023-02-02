import knex from 'knex';

const options = {
    client: 'mysql',
    connection: {
        client: '127.0.0.1',
        user: 'root',
        password: '',
        database: 'test'
    },
}

export const baseDeDatos = knex(options);
