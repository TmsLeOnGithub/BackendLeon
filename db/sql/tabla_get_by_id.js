import { baseDeDatos } from './db_config.js';

export const getDatoById = (tabla, id) => {
    return baseDeDatos.from(tabla).where({id: id}).first()
    .then((producto)=> producto)
    .catch((err)=>{ console.log(err);throw err})
}