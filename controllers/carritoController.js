import {carritoService} from '../negocio/carritoService.js';

const crearCarrito = (req, res) => {
    carritoService.crearCarrito.then(({ id }) => {
        res.status(200).send({ id });
        res.end();
    })
}

const borrarCarrito = (req, res) => {
    carritoService.borrarCarrito.then(() => {
        res.status(200).send();
        res.end();
    })
};

const agregarProducto = async (req, res) => {
    carritoService.agregarProducto.then(() => {
        res.status(200);
        res.end();
    })
}

const obtenerProductos = (req, res) => {
    carritoService.obtenerProductos.then(carrito => {
        res.send(carrito?.productos);
        res.end();
    })
}

const borrarProducto = async (req, res) => {
    if (!process.env.IS_ADMIN) {
        res.status(403).send({ error: -1, descripcion: 'ruta no autorizada' })
        res.end();
    }

    const carrito = await carritoService.obtenerCarrito(req.params?.id);

    if (!carrito) {
        res.status(200).send({ error: "el carrito no existe" });
        res.end();
    }

    const productos = carrito?.productos.filter(producto => producto.id !== Number(req.params?.id_prod));
    carrito.productos = productos;

    carritoService.borrarProducto(req.params?.id, carrito).then(() => {
        res.status(200).send();
        res.end();
    })
};


export const carritoController = { crearCarrito, borrarCarrito, agregarProducto, obtenerProductos, borrarProducto };