import fs from 'fs';

// Contenedor que trabaja sobre un archivo
export class ContenedorFileSystem {
  nombreArchivo;

  constructor(nombreArchivo) {
    this.nombreArchivo = '.' + nombreArchivo;
  }

  async save(item) {
    try {
      const items = await this.getAll();
      console.log("items: ", items);
      console.log("item a guardar: ", item);
      item.id = items?.length === 0 ? 1 : items[items.length - 1].id + 1;
      item.timestamp = Date.now();

      items.push(item);
      await fs.promises.writeFile(this.nombreArchivo, JSON.stringify(items), { encodig: `utf-8` });
      return item;
    } catch (error) {
      console.log("error al guardar el item.")
    }
  }

  async update(id, itemModificado) {
    try {
      const items = await this.getAll();
      const index = items?.findIndex(i => i.id === id);

      if(index === -1) return null;

      const item = items[index];

      items[index] = {
        ...item,
        ...itemModificado
      }
      await fs.promises.writeFile(this.nombreArchivo, JSON.stringify(items), { encodig: `utf-8` });
      return items[index];
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

      console.log(this.nombreArchivo);
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
      console.log(`Error al eliminar el item`)
    }
  }

  async deleteAll() {
    try {
      const items = []
      await fs.promises.writeFile(this.nombreArchivo, JSON.stringify(items), { encodig: `utf-8` });
    } catch (error) {
      console.log(`No se pudieron eliminar los items.`)
    }
  }
}


