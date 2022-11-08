import { baseDeDatos } from './db_config.js';
export const getDatos = (tabla) => {
    return baseDeDatos.from(tabla)
    .then((producto)=> producto)
    .catch((err)=>{ console.log(err);throw err})
}