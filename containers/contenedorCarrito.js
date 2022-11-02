import {Carrito } from '../models/carrito.js';
import fs from 'fs';
import { Contenedor } from './contenedor.js';

export class ContenedorCarrito {
    nombreArchivo;
    contenedorProducto = new Contenedor('productos.txt');

    constructor(nombreArchivo) {
      this.nombreArchivo = nombreArchivo;
    }

    async crearCarrito() {
      try {
        const items = await this.getAll();
        const id = items?.length === 0 ? 1 : items[items.length - 1].id + 1;
        console.log(id)
        const carrito = new Carrito(id);
        console.log(items)
        items.push(carrito);
        await fs.promises.writeFile(this.nombreArchivo, JSON.stringify(items), { encodig: `utf-8` });
        return id;
      } catch (error) {
        console.log("hubo un error al intentar guardar el item")
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

    async agregarProducto(idCarrito, idProducto) {
      try {
        const carritos = await this.getAll();
        const carrito = carritos.find((item) => item.id === idCarrito);
        console.log('carrito', carrito);
        const producto = await this.contenedorProducto.getById(idProducto);
        console.log('producto', producto)
        carrito.productos.push(producto);
        await fs.promises.writeFile(this.nombreArchivo, JSON.stringify(carritos), { encodig: `utf-8` });
      } catch (error) {
        console.log('error al agregar producto al carrito')
      }
    }

    async getProductosById(id) {
      try {
        const items = await this.getAll();
        const item = items.find((item) => item.id === id);
        return item?.productos;
      } catch (error) {
        console.log('hubo un error al intentar buscar el item')
      }
    }

    async borrarProducto(idCarrito, idProducto) {
      try {
        const carritos = await this.getAll();
        const carrito = carritos.find((item) => item.id === idCarrito);
        carrito.productos.filter(item => item.id !== idProducto);
        await fs.promises.writeFile(this.nombreArchivo, JSON.stringify(carritos), { encodig: `utf-8` });
      } catch (error) {
        console.log('error al borrar producto al carrito')
      }
    }
}