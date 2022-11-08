import express from 'express'
import { Server as IOServer } from 'socket.io'
import { Server as HttpServer } from 'http';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

import { ContenedorProductosDB } from './containers/contenedorProductosDB.js';
import { ContenedorMensajeDb } from './containers/contenedorMensajeDB.js';
import { productosRouterDb } from './routes/productosRouterDb.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const httServer = new HttpServer(app)
const io = new IOServer(httServer)

app.use(express.static('./public'))
app.use('/api/productos', productosRouterDb)
app.get('/', (req, res) => {
  res.sendFile('index.html', { root: __dirname })
})

const contenedor = new ContenedorProductosDB('productos');
const contenedorMensajes = new ContenedorMensajeDb('mensajes');

const PORT = 3000;

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

const guardarMensaje = async (message) => {
  contenedorMensajes.save(message).then(() => {
    contenedorMensajes.getAll().then((mensajes) => io.sockets.emit("messages", mensajes))
  });
}


const enviarTodosLosMensajes = async (socket) => {
  contenedorMensajes.getAll().then((mensajes) => io.sockets.emit("messages", mensajes))
}