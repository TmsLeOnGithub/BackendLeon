import express from "express";
import { esAdministrador } from "../consts/administrador.js";
import { ContenedorCarrito } from '../containers/contenedorCarrito.js';

const contenedor = new ContenedorCarrito('carritos.txt');
const { Router } = express;
export const carritoRouter = Router();

carritoRouter.post('/', (req, res) => {
    contenedor.crearCarrito().then(id => {
        res.status(200).send({id: id});
        res.end();
    })
})

carritoRouter.delete('/:id', (req, res) => {
  contenedor.deleteById (Number(req.params?.id)).then(() => {
    res.status(200).send();
    res.end();
})
});

carritoRouter.get('/:id/productos', (req, res) => {
    contenedor.getProductosById(Number(req.params?.id)).then(productos => {
        res.send(productos);
        res.end();
    })
})


carritoRouter.post('/:id/productos', (req, res) => {
    const idProducto = req.body?.idProducto;
    contenedor.agregarProducto(Number(req.params?.id), Number(idProducto)).then(() => {
        res.status(200);
        res.end();
    })
})

carritoRouter.delete('/:id/productos/:id_prod', (req, res) => {
    if(!esAdministrador) {
        res.status(403).send({error: -1 , descripcion: 'ruta no autorizada'})
        res.end();
    }

    contenedor.borrarProducto(Number(req.params?.id), Number(req.params?.id_prod)).then(() => {
        res.status(200).send();
        res.end();
    })
});
