import { getMensajes } from "../sqlite/tabla_get.js";
import { guardarMensaje } from "../sqlite/tabla_insert.js";

export class ContenedorMensajeDb {
    tabla;

    constructor(tabla) {
        this.tabla = tabla;
    }

    async save(item) {
        item.timestamp = new Date();
        await guardarMensaje(this.tabla, item);
    }

    async getAll() {
        return await getMensajes(this.tabla);
    }
}