import express from "express";
import { ContenedorProductosDB } from "../containers/contenedorProductosDB.js";

const tabla = 'productos';

const contenedor = new ContenedorProductosDB(tabla);
const { Router } = express;
export const productosRouterDb = Router();

productosRouterDb.get('/', (req, res) => {
    contenedor.getAll().then(productos => {
        res.send(productos);
        res.end();
    });
})

productosRouterDb.get('/:id', (req, res) => {
    contenedor.getById(Number(req.params?.id)).then(producto => {
        res.send(producto ? producto : { error: 'Producto no encontrado' });
        res.end();
    })
})

productosRouterDb.post('/', (req, res) => {
    const producto = req.body;
    contenedor.save(producto).then((item) => {
        res.status(200).send(item)
        res.end();
    })
})

productosRouterDb.put('/:id', (req, res) => {
    contenedor.update(Number(req.params?.id), req.body).then((item) => {
        res.status(200).send(item)
        res.end();
    })
})

productosRouterDb.delete('/:id', (req, res) => {
    contenedor.deleteById(Number(req.params?.id)).then(() => {
        res.status(200).send();
        res.end();
    })
});