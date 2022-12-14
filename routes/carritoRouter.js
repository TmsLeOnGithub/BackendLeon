import express from "express";
import { esAdministrador } from "../consts/administrador.js";
import { CartDao, ProductDao } from "../dao/index.js";
import {Carrito } from '../models/carrito.js';

const { Router } = express;
export const carritoRouter = Router();

carritoRouter.post('/', (req, res) => {
    const carrito = new Carrito();
    CartDao.save(carrito).then(id => {
        res.status(200).send({id: id});
        res.end();
    })
})

carritoRouter.delete('/:id', (req, res) => {
    CartDao.deleteById (Number(req.params?.id)).then(() => {
    res.status(200).send();
    res.end();
})
});

carritoRouter.get('/:id/productos', (req, res) => {
    CartDao.getById(Number(req.params?.id)).then(carrito => {
        res.send(carrito?.productos);
        res.end();
    })
})


carritoRouter.post('/:id/productos', async(req, res) => {

    const carrito = await CartDao.getById(req.params?.id);
    const producto = await ProductDao.getById(req.body?.idProducto);

    carrito?.productos.push(producto);

    CartDao.update(Number(req.params?.id), carrito).then(() => {
        res.status(200);
        res.end();
    })
})

carritoRouter.delete('/:id/productos/:id_prod', async(req, res) => {
    if(!esAdministrador) {
        res.status(403).send({error: -1 , descripcion: 'ruta no autorizada'})
        res.end();
    }

    const carrito = await CartDao.getById(req.params?.id);

    if(!carrito){
        res.status(200).send({error: "el carrito no existe"});
        res.end();
    }

    const productos = carrito?.productos.filter(producto => producto.id !==  Number(req.params?.id_prod));
    carrito.productos = productos;

    CartDao.update(Number(req.params?.id), carrito).then(() => {
        res.status(200).send();
        res.end();
    })
});
