import express from "express";
import { productosRouter } from "./routes/productosRouter.js";
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const app = express();
const PORT = 8080;

app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));
app.use('/api/productos', productosRouter);
app.use('/formularios', express.static(__dirname + '/public/index.html'));
console.log(`1) link formulario: http://localhost:8080/formularios`)
app.use(express.static(__dirname + '/public'))
console.log('2) link formulario:.....');

const server = app.listen(PORT, () => console.log('Server listening'));
server.on("error", err => console.log(`Error ${err}`));