import express from "express";
import router from "./routes/personas.js"

const app = express();
const PORT = 8080;

const server = app.listen(PORT, () => console.log(`Server escuchando en el puerto ${PORT}`))
server.on('Error', err => console.log(`Error ${err}`))
app.use(express.json());

//app.use ('/mascotas',routeMascotas);
app.use('/personas', router);