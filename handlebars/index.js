import express from "express";
import { productosRouter } from "../routes/productosRouter.js";
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { create } from 'express-handlebars';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const app = express();
const PORT = 8080;

app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));
app.use('/api/productos', productosRouter);
app.use('/formularios', express.static(__dirname + '/public/formularios.html'));
console.log(`1) link formulario: http://localhost:8080/formularios`)
app.use(express.static(__dirname + '/public'))
console.log('2) link formulario:.....');

const hbs = create({
    // helpers:{
    //     estadoSuscripcion (fecha){
    //         const ahora= new date ().getTime ();
    //         const fechaSuscripcion = new date (fecha).getTime;
    //         let diferenciaDias= fechaSuscripcion - ahora
    //         diferenciaDias = diferenciaDias/(1000*60*60*24);
    //         if (diferenciaDias>0)
    //         return `Te quedan` + parseInt (diferenciaDias) + `dias.`

    //         return 'Plan vencido'
    //     }
    // }
});

// Agrego handlebar como view engine
app.engine(`handlebars`, hbs.engine);
app.set('view engine', 'handlebars');
app.set(`views`, './views');

app.get('/', (req, res, next) => {
    const valores = {
        nombre: 'Mateo Retegui',
        genero: 'masculino',
        contraseña: 'tigre23',
        mail: 'Retegol@gmal.com'
    }

    res.render('view/home', valores);
})


const server = app.listen(PORT, () => console.log('Server listening'));
server.on("error", err => console.log(`Error ${err}`));