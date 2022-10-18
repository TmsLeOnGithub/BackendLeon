import express from "express";
var app= express();
const PORT=8080;
const server = app.listen (PORT,()=> console.log ( `Server escuchando en el puerto ${PORT}`))
server.on (`error`, err => console.log (err));
import { fileURLToPath } from 'url';//......
import { dirname } from 'path';//.....

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(express.json());
app.use (express.urlencoded({ extended:true}));
app.set('views', './views');
app.set ('view engine', 'ejs');

let personas = [];

app.get('/personas',(req,res)=>{
    res.render('index.ejs', { personas }); //index.EJS?
})


app.post ('/personas',(req,res)=>{
    const { nombre,apellido,edad } = req.body;
    personas.push( {nombre,apellido,edad});
    res.redirect('/personas')
})

