import knex from 'knex';

const options = {
    client: 'sqlite3',
    connection: {
        filename: 'db/ecommerce.sqlite'
    },
    useNullAsDefault: true
}

export const ecommerceDb = knex(options);
