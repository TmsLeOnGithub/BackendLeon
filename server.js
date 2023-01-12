import express from 'express'
import { Server as IOServer } from 'socket.io'
import { Server as HttpServer } from 'http';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import normalizr from 'normalizr';
import { productosRouter } from './routes/productosRouter.js'
import { carritoRouter } from './routes/carritoRouter.js';
import { config } from './config/index.js';
import { MensajesDao, ProductDao } from './dao/index.js';
import fakerRouter from './routes/fakerRouter.js';
import mensajesSchema from './normalize/mensajes.schema.js';
//DESAFIO CLASE 32
import compression from "compression";
import logger from './errores/logger.js';

// Cluster / Fork configuration

import cluster from 'cluster';
import os from 'os';
const numCPUs = os.cpus().length;


import { PassportAuth } from './middlewares/index.js'; 


//#region handlebars engine
import {engine} from 'express-handlebars';


// #region EXPRESS-SESSION
import session from 'express-session';
import cookieParser from 'cookie-parser';
import mongoStore from 'connect-mongo';

import sessionRouter from './routes/sessionRouter.js';
import { authApiMiddleware } from './middlewares/api-auth.js';
import { authUIMiddleware } from './middlewares/ui-auth.js';
import passport from 'passport';
import checkAuthentication from './middlewares/utilDeMiddlewares.js';
// #endregion

import yargs from 'yargs';
import randomRouter from './routes/randomRouter.js';

const yargConfig = yargs(process.argv.slice(2));

const args = yargConfig.default({port: 8080, mode: 'FORK'}).argv;

const normalize = normalizr.normalize;
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

//DESAFIO CLASE 32
app.use(compression())
//////

PassportAuth.init(); 

const httServer = new HttpServer(app)
const io = new IOServer(httServer)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//app.use("/api/auth",AuthRouter)/////////////////////////////////fijarse si va en este archivo

//#region HANDLEBAR AS ENGINE
app.engine('handlebars', engine());
app.set('views', './views');
app.set('view engine', 'handlebars');

//#region EXPRESS-SESSION
app.use(cookieParser());

app.use(session({
  store: mongoStore.create({ mongoUrl: process.env.MONGO_DB_URL, ttl: 600, mongoOptions: { useNewUrlParser: true, useUnifiedTopology: true } }), // TIEMPO DE EXPIRACION DE SESION
  secret: 'secret',
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
//#endregion

app.use(express.static('./public'))

const loggerMiddleware = (req, res, next) => {
  const { url, baseUrl, method } = req
  logger.info(`Ruta ${method} ${baseUrl}${url} llamada`)
  return next();
}

app.use("/session", loggerMiddleware, sessionRouter);
app.use ("/api/randoms",loggerMiddleware, randomRouter)
app.use("/api/carrito", loggerMiddleware, authApiMiddleware, carritoRouter);
app.use('/api/productos',loggerMiddleware, authApiMiddleware, productosRouter)
app.use("/api/productos-test", loggerMiddleware, authApiMiddleware, fakerRouter);
app.get('/', checkAuthentication, (req, res) => {
res.sendFile('index.html', { root: __dirname })})



if(args.mode === 'FORK'){
  httServer.listen(args.port, () => console.log('Server ON  :) PORT ' + args.port + ' PID ' + process.pid))  
}else if(args.mode === 'CLUSTER'){
 if(cluster.isPrimary) {
  for (let index = 0; index < numCPUs; index++) {
    cluster.fork();
  }
 } else {
  httServer.listen(args.port, () => console.log('Server ON  :) PORT ' + args.port + ' PID ' + process.pid))  
 } 
}

httServer.on('error', error => logger.error(`Error en servidor: ${error}`))


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
      const chat = { id: 'chat', mensajes: [...mensajes?.map(mensaje => { return { _id: mensaje._id, ...mensaje._doc } })] };
      io.sockets.emit("messages", normalize(chat, mensajesSchema.chat))
    })
  });
}


const enviarTodosLosMensajes = async (socket) => {
  MensajesDao.getAll().then((mensajes) => {
    const chat = { id: 'chat', mensajes: [...mensajes?.map(mensaje => { return { _id: mensaje._id, ...mensaje._doc } })] };
    io.sockets.emit("messages", normalize(chat, mensajesSchema.chat))
  })
}

app.get('*', (req, res) => {
  const { url, method } = req
  logger.warn(`Ruta ${method} ${url} no implementada`)
  res.send(`Ruta ${method} ${url} no está implementada`)
})