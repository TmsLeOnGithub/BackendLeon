import { ecommerceDb } from "./SQLite3.js";

export const getMensajes = (tabla) => {
    return ecommerceDb.from(tabla)
    .then((mensaje)=> mensaje)
    .catch((err)=>{ console.log(err);throw err})
}