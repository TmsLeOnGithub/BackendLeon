import { ProductDao } from "../db/index.js"

const obtenerProductos = () => ProductDao.getAll()

const obtenerProducto = (id) => ProductDao.getById(id)

const crearProducto = (producto) => {
    console.log('creando producto', producto);
    producto.timestamp = Date.now();
    return ProductDao.save(producto);
}

const actualizarProducto = (id, producto) => ProductDao.update(id, producto);

const borrarProducto = (id) =>  ProductDao.deleteById(id);


export const productosService = {obtenerProductos, obtenerProducto,crearProducto, actualizarProducto, borrarProducto }