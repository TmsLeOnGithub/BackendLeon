import express from 'express'
import { Server as IOServer } from 'socket.io'
import { Server as HttpServer } from 'http';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import dayjs from "dayjs";
import customParseFormat from 'dayjs/plugin/customParseFormat.js';

dayjs.extend(customParseFormat)

import { Contenedor } from './containers/contenedor.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const httServer = new HttpServer(app)
const io = new IOServer(httServer)

app.use(express.static('./public'))
app.get('/', (req, res) => {
  res.sendFile('index.html', { root: __dirname })
})

const contenedor = new Contenedor('productos.txt');
const PORT = 3000;
const mensajes = [];

httServer.listen(PORT, () => console.log('Server ON  :) PORT ' + PORT))

io.on('connection', socket => {
  enviarTodosLosProductos(socket)
  enviarTodosLosMensajes(socket)

  socket.on("new-product", producto => {
    guardarProducto(producto)
  })

  socket.on(`new-message`, mensaje => {
    guardarMensaje(mensaje)
  });
});

/* -------------------------------------------------------------------------- */
/*                                  PRODUCTOS                                 */
/* -------------------------------------------------------------------------- */

const enviarTodosLosProductos = async (socket) => {
  const productos = await contenedor.getAll()
  socket.emit("all-products", productos)
}

const guardarProducto = async (producto) => {
  await contenedor.save(producto)
  const productos = await contenedor.getAll()
  io.sockets.emit("all-products", productos)
}

/* -------------------------------------------------------------------------- */
/*                                  CHAT                                 */
/* -------------------------------------------------------------------------- */

const guardarMensaje = async (message) =>{
  const date = new Date()
  const dateFormated = dayjs(date).format('DD/MM/YYYY hh:mm:ss')
  const newMessage = { ...message, createdAt: `${dateFormated} hs` }
  mensajes.push(newMessage);
  io.sockets.emit("messages", mensajes)
}

const enviarTodosLosMensajes = async (socket) => {
  socket.emit("messages", mensajes)
}