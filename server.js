import express from 'express'
import { Server as IOServer } from 'socket.io'
import { Server as HttpServer } from 'http';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import normalizr from 'normalizr';
const normalize = normalizr.normalize;
const denormalize = normalizr.denormalize;

import { productosRouter } from './routes/productosRouter.js'
import { carritoRouter } from './routes/carritoRouter.js';
import { config } from './config/index.js';
import { MensajesDao, ProductDao } from './dao/index.js';
import fakerRouter from './routes/fakerRouter.js';
import mensajesSchema from './normalize/mensajes.schema.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const httServer = new HttpServer(app)
const io = new IOServer(httServer)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('./public'))
app.use("/api/carrito", carritoRouter);
app.use('/api/productos', productosRouter)
app.use("/api/productos-test", fakerRouter);
app.get('/', (req, res) => {
  res.sendFile('index.html', { root: __dirname })
})

httServer.listen(config.SERVER.PORT, () => console.log('Server ON  :) PORT ' + config.SERVER.PORT))

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
  const productos = await ProductDao.getAll()
  socket.emit("all-products", productos)
}

const guardarProducto = async (producto) => {
  await contenedor.save(producto)
  const productos = await ProductDao.getAll()
  io.sockets.emit("all-products", productos)
}

/* -------------------------------------------------------------------------- */
/*                                  CHAT                                 */
/* -------------------------------------------------------------------------- */

const guardarMensaje = async (mensaje) => {   
   MensajesDao.save(mensaje).then(() => {
    MensajesDao.getAll().then((mensajes) => {
      const chat = { id: 'chat', mensajes: [...mensajes?.map(mensaje => { return {_id: mensaje._id, ...mensaje._doc} })] };
      io.sockets.emit("messages",  normalize(chat, mensajesSchema.chat))
    })
   });
}


const enviarTodosLosMensajes = async (socket) => {
  MensajesDao.getAll().then((mensajes) => {
    const chat = { id: 'chat', mensajes: [...mensajes?.map(mensaje => { return {_id: mensaje._id, ...mensaje._doc} })] };
    io.sockets.emit("messages",  normalize(chat, mensajesSchema.chat))
  })
}