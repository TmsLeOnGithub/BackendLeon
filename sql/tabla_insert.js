import { baseDeDatos } from './db_config.js';

export const guardarDato = (tabla, item) => {
    return baseDeDatos(tabla).insert(item)
    .then(()=> console.log("data insertada"))
    .catch((err)=>{ console.log(err);throw err})
}