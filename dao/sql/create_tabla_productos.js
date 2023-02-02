import { baseDeDatos } from './db_config.js';

baseDeDatos.schema.createTable(`productos`, table => {
    table.increments(`id`)
    table.string(`titulo`)
    table.float(`precio`)
    table.string('thumbnail')
    table.string('descripcion')
    table.date('timestamp')
    table.integer('stock')
})
    .then(() => console.log("Tabla creada"))
    .catch((err) => { console.log(err); throw err })
    .finally(() => {
        baseDeDatos.destroy();
    });