import { CartDao, ProductDao } from "../db/index.js";
import { Carrito } from "../negocio/models/carrito.js";
import { mailerService } from "./mailerService.js";

export const crearCarrito = () => {
    const carrito = new Carrito();
    return CartDao.save(carrito)
}

export const borrarCarrito = (id) => {
    return CartDao.deleteById(id);
}

const obtenerCarrito = async (id) => await CartDao.getById(id);

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

export const finalizarPedido = async (id, user) => {
    const carrito = await CartDao.getById(id);
    const html = `<div style="display:flex; flex-direction: column;">
   
   <h1>Pedido realizado</h1>

   <div>Gracias por su pedido ${user.email}</div>
   <h2>Resumen de su pedido</h2>

   <ol>
      ${carrito.productos.map(p => `<li>${p.titulo} - $ ${p.precio}</li>`)}
   </ol>

   <h3>Total: ${carrito.productos.reduce((prev, curr) => prev+= curr.precio, 0)}</h3>
   </div>`;

    return mailerService.enviarEmail(user.email, "Pedido realizado", html);
}


export const carritoService = { crearCarrito, borrarCarrito, agregarProducto, obtenerProductos, obtenerCarrito, borrarProducto, finalizarPedido }