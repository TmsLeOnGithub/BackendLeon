import express from "express";
import { productosRouter } from "../routes/productosRouter.js";
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { create } from 'express-handlebars';
import { Contenedor } from "../containers/contenedor.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const app = express();
const PORT = 8080;

app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));
app.use('/api/productos', productosRouter);
app.use(express.static(__dirname + '/public'))

const hbs = create({});

const contenedor = new Contenedor('productos.txt');

// Agrego handlebar como view engine
app.engine(`handlebars`, hbs.engine);
app.set('view engine', 'handlebars');
app.set(`views`, './views');

app.get('/', (req, res, next) => {
    res.render('view/productos', {});
})

app.get('/productos', (req, res, next) => {
    contenedor.getAll().then((productos) => {
        res.render('view/tabla-productos', {productos});
    })
})

const server = app.listen(PORT, () => console.log('Server listening on ' + PORT));
server.on("error", err => console.log(`Error ${err}`));