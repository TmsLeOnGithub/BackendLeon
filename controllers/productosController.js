import {productosService} from '../negocio/productosService.js';


const obtenerProductos = (req, res) => {
    productosService.obtenerProductos().then(productos => {
        res.send(productos);
        res.end();
    });
};

const obtenerProducto = (req, res) => {
    productosService.obtenerProducto(req.params?.id).then(producto => {
        res.send(producto ? producto : { error: 'Producto no encontrado' });
        res.end();
    })
}

const crearProducto = (req, res) => {
    productosService.crearProducto(req.body).then((item) => {
        res.status(200).send(item)
        res.end();
    })
}

const actualizarProducto = (req, res) => {
    productosService.actualizarProducto(req.params.id, req.body).then((item) => {
        res.status(200).send(item)
        res.end();
    })
}

const borrarProducto = (req, res) => {
    productosService.borrarProducto(req.params?.id).then(() => {
        res.status(200).send();
        res.end();
    })
};


export const productosController = { obtenerProducto, obtenerProductos, crearProducto, actualizarProducto, borrarProducto }