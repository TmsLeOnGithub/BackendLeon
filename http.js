import express from 'express';
import { Contenedor } from './containers/contenedor.js';

const app= express();
const PORT =8080
const contenedor = new Contenedor('productos.txt');

app.get ('/productos', (req, res) =>{
    contenedor.getAll().then(productos => {
        res.json(productos);
        res.end();
    })
})

app.get ('/productoRandom', (req, res) =>{
    contenedor.getAll().then(productos => {
        const maxIndex = productos.length - 1;
        var index = Math.ceil(Math.random()*maxIndex);
        res.json(productos[index]);
        res.end();
    })

})

app.get ('*', (req,res) => res.send (`Ruta no valida`))

const server = app.listen(PORT, () => console.log('serve listening on por ' + PORT))


