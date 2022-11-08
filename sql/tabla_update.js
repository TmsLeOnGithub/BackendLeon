import { baseDeDatos } from './db_config.js';

export const actualizarDato = (tabla, id, item) => {
    return baseDeDatos.from(tabla).where({id: id}).update(item)
    .then(()=> console.log("data insertada"))
    .catch((err)=>{ console.log(err);throw err})
}