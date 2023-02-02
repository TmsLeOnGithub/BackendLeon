import { ecommerceDb } from './SQLite3.js';

ecommerceDb.schema.createTable(`mensajes`, table => {
    table.string('username')
    table.string('texto')
    table.date('timestamp')
  
})
    .then(() => console.log("Tabla de mensajes creada"))
    .catch((err) => { console.log(err); throw err })
    .finally(() => {
        ecommerceDb.destroy();
    });