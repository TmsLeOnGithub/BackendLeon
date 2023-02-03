import { CartDao, ProductDao } from "../db/index.js";
import { Carrito } from "../negocio/models/carrito.js";

export const crearCarrito = () => {
    const carrito = new Carrito();
    return CartDao.save(carrito)
}

export const borrarCarrito = (id) => {
    return CartDao.deleteById(id);
}

const obtenerCarrito = async(id) => await CartDao.getById(id);

export const agregarProducto = async (cartId, productId) => {
    const carrito = await CartDao.getById(cartId);
    const producto = await ProductDao.getById(productId);

    carrito?.productos.push(producto);

    return CartDao.update(cartId, carrito)
}

export const obtenerProductos = (cartId) => CartDao.getById(cartId)

export const borrarProducto = (id, carrito) => {
    return CartDao.update(Number(id), carrito)
}



export const carritoService = { crearCarrito, borrarCarrito, agregarProducto, obtenerProductos, obtenerCarrito, borrarProducto }