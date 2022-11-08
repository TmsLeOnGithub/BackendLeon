import { ecommerceDb } from "./SQLite3.js";

export const guardarMensaje = (tabla, item) => {
    return ecommerceDb(tabla).insert(item)
    .then(()=> console.log("data insertada"))
    .catch((err)=>{ console.log(err);throw err})
}