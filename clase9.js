import express from "express";
import { create } from 'express-handlebars';
const app = express();
const PORT = 3000;

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

app.engine(`handlebars`, hbs.engine);

app.set('view engine', 'handlebars');

app.set(`views`, './views');
app.use(express.static('public'))

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