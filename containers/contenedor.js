import fs from 'fs';

export class Contenedor {
  nombreArchivo;

  constructor(nombreArchivo) {
    this.nombreArchivo = nombreArchivo;
  }

  async save(item) {
    try {
      const items = await this.getAll();
      item.id = items?.length === 0 ? 1 : items[items.length - 1].id + 1;
      items.push(item);
      await fs.promises.writeFile(this.nombreArchivo, JSON.stringify(items), { encodig: `utf-8` });
      return item;
    } catch (error) {
      console.log("hubo un error al intentar guardar el item")
    }
  }

  async update(id, itemModificado) {
    try {
      const items = await this.getAll();
      const item = items?.find(i => i.id === id);
      item.titulo = itemModificado.titulo;
      item.precio = itemModificado.precio;
      item.thumbnail = itemModificado.thumbnail;
      await fs.promises.writeFile(this.nombreArchivo, JSON.stringify(items), { encodig: `utf-8` });
      return item;
    } catch (error) {
      console.log("hubo un error al intentar guardar el item");
    }
  }

  async getById(id) {
    try {
      const items = await this.getAll();
      const item = items.find((item) => item.id === id);
      return item;
    } catch (error) {
      console.log('hubo un error al intentar buscar el item')
    }
  }

  async getAll() {
    try {
      const file = await fs.promises.readFile(this.nombreArchivo, 'utf-8');
      if (file) {
        return JSON.parse(file);
      } else {
        return [];
      }
    } catch (error) {
      console.log('no se pudo leer el archivo')
    }
  }

  async deleteById(id) {
    try {
      const items = await this.getAll();
      const newItemsArray = items.filter(item => item.id !== id);
      await fs.promises.writeFile(this.nombreArchivo, JSON.stringify(newItemsArray), { encodig: `utf-8` });
    } catch (error) {
      console.log(`Error al eliminar el producto`)
    }
  }

  async deleteAll() {
    try {
      const items = []
      await fs.promises.writeFile(this.nombreArchivo, JSON.stringify(items), { encodig: `utf-8` });
    } catch (error) {
      console.log(`No se pudieron eliminar los productos.`)
    }
  }
}


