import express from "express";
//import { fileURLToPath } from 'url';
//import { dirname } from 'path';
//const __filename = fileURLToPath(import.meta.url);
//const __dirname = dirname(__filename);
const app = express();
const PORT = 8080;

app.set('views', './views');
app.set('view engine', 'pug');


//app.use(express.json());
//app.use(express.static(__dirname + '/public'))


/*app.get('/hello', (req, res) => {
    res.render('hello.pug', { mensaje: 'Usando Pug Js en Express' });
});*/


// URL DE PRUEBA => http://localhost:8080/datos?max=90&min=20&nivel=30&titulo=medidor
app.get('/datos', (req, res) => {
    const { min,nivel,max,titulo }= req.query;
    const lista= [ {id:1, titulo:'celular', precio:46000, thumbnail:'foto no disponible' } ]
    res.render('index.pug',{ min, nivel, max, titulo, lista });
    
});

/*app.get ('/productos', (req,res)=>{
    const lista= [ {id:1, titulo:'celular', precio:46000, thumbnail:'foto no disponible' } ]
})*/

const server = app.listen(PORT, () => console.log('Server listening'));
server.on("error", err => console.log(`Error ${err}`));
