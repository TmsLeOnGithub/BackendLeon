import { baseDeDatos } from './db_config.js';

export const borrarDato = (tabla, id) => {
    return baseDeDatos.from(tabla).where({id: id}).del()
    .then(()=> console.log('producto eliminado'))
    .catch((err)=>{ console.log(err);throw err})
}