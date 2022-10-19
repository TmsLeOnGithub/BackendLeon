import { Router } from "express";
import { Contenedor } from '../containers/contenedor.js';

const contenedor = new Contenedor('productos.txt');

export const productosRouter = Router();


productosRouter.get('/', (req, res) => {
    contenedor.getAll().then(productos => {
        res.send(productos);
        res.end();
    });
})

productosRouter.get('/:id', (req, res) => {
    contenedor.getById(Number(req.params?.id)).then(producto => {
        res.send(producto ? producto : {error: 'Producto no encontrado'});
        res.end();
    })
})

productosRouter.post('/', (req, res) => {
    const producto = req.body;
    contenedor.save(producto).then((item) => {
        res.status(200).send(item)
    })
})

productosRouter.put('/:id', (req, res) => {
    contenedor.update(Number(req.params?.id), req.body).then((item) => {
        res.status(200).send(item)
    })
})

productosRouter.delete('/:id', (req, res) => {
    contenedor.deleteById(Number(req.params?.id)).then(() => {
        res.status(200).send();
        res.end();
    })
});