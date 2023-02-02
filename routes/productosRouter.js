import express from "express";
import { ProductDao } from "../db/index.js";

const { Router } = express;
export const productosRouter = Router();

productosRouter.get('/', (req, res) => {
    ProductDao.getAll().then(productos => {
        res.send(productos);
        res.end();
    });
})

productosRouter.get('/:id', (req, res) => {
    ProductDao.getById(req.params?.id).then(producto => {
        res.send(producto ? producto : {error: 'Producto no encontrado'});
        res.end();
    })
})

productosRouter.post('/', (req, res) => {
    console.log(req.body);
    const producto = req.body;
    producto.timestamp = Date.now();
    ProductDao.save(producto).then((item) => {
        res.status(200).send(item)
        res.end();
    })
})

productosRouter.put('/:id', (req, res) => {
    ProductDao.update(req.params?.id, req.body).then((item) => {
        res.status(200).send(item)
        res.end();
    })
})

productosRouter.delete('/:id', (req, res) => {
    ProductDao.deleteById(req.params?.id).then(() => {
        res.status(200).send();
        res.end();
    })
});