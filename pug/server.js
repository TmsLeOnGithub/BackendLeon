import express from "express";
import { Contenedor } from "../containers/contenedor";
const app = express();
const PORT = 8080;

app.set('views', './views');
app.set('view engine', 'pug');

const contenedor = new Contenedor('productos.txt');


// URL DE PRUEBA => http://localhost:8080/datos?max=90&min=20&nivel=30&titulo=medidor
app.get('/', (req, res) => {
    res.render('index.pug',{ min, nivel, max, titulo, lista });
    
});

/*app.get ('/productos', (req,res)=>{
    const lista= [ {id:1, titulo:'celular', precio:46000, thumbnail:'foto no disponible' } ]
})*/

const server = app.listen(PORT, () => console.log('Server listening'));
server.on("error", err => console.log(`Error ${err}`));
