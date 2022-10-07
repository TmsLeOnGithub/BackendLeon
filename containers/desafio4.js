import express from "express";
import { Contenedor } from './contenedor.js';
const contenedor = new Contenedor('productos.txt');
const app = express();
const PORT = 8080;
const { Router } = express;
const router = Router();

router.get('/productos', (req, res) => {
    contenedor.getAll().then(productos => {
        res.send(productos);
        res.end();
    });
})

router.post('/productos', (req, res) => {
    console.log(req.body);
    const producto = req.body;
    contenedor.save(producto).then((item) => {
        res.status(200).send(item)
    })
})

app.use('/api', router);
const server = app.listen(PORT, () => console.log(`Escuchando en el puerto ${PORT}`));
server.on(`Error`, err => console.log(`Error ${err}`));