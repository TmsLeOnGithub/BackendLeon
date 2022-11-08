import { borrarDato } from '../sql/tabla_delete.js';
import { getDatos } from '../sql/tabla_get.js';
import { getDatoById } from '../sql/tabla_get_by_id.js';
import { guardarDato } from '../sql/tabla_insert.js';
import { actualizarDato } from '../sql/tabla_update.js';

export class ContenedorProductosDB {
  tabla;

  constructor(tabla) {
    this.tabla = tabla;
  }

  async save(item) {
    item.timestamp = new Date();
    await guardarDato(this.tabla, item);
  }

  async update(id, itemModificado) {
    await actualizarDato(this.tabla, id, itemModificado);
  }

  async getById(id) {
   return await getDatoById(this.tabla, id);
  }

  async getAll() {
    return await getDatos(this.tabla);
  }

  async deleteById(id) {
    return await borrarDato(this.tabla, id);
  }
}


