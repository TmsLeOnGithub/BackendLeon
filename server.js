import cluster from 'cluster';
import compression from 'compression';
import mongoStore from 'connect-mongo';
import cookieParser from 'cookie-parser';
import express from 'express';
import { engine } from 'express-handlebars';
import session from 'express-session';
import { Server as HttpServer } from 'http';
import normalizr from 'normalizr';
import os from 'os';
import passport from 'passport';
import { dirname } from 'path';
import { Server as IOServer } from 'socket.io';
import { fileURLToPath } from 'url';
import yargs from 'yargs';
import ProductosGraphQLController from './controllers/productosGraphQLController.js';

import { MensajesDao, ProductDao } from './db/index.js';
import logger from './errores/logger.js';
import mensajesSchema from './normalize/mensajes.schema.js';
import { carritoRouter } from './routes/carritoRouter.js';
import fakerRouter from './routes/fakerRouter.js';
import { authApiMiddleware } from './routes/middlewares/api-auth.js';
import { PassportAuth } from './routes/middlewares/index.js';
import checkAuthentication from './routes/middlewares/utilDeMiddlewares.js';
import { productosRouter } from './routes/productosRouter.js';
import randomRouter from './routes/randomRouter.js';
import sessionRouter from './routes/sessionRouter.js';

// Cluster / Fork configuration
const numCPUs = os.cpus().length;
const yargConfig = yargs(process.argv.slice(2));
const args = yargConfig.default({port: 8080, mode: 'FORK'}).argv;

const normalize = normalizr.normalize;
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

app.use(compression())
PassportAuth.init(); 

const httServer = new HttpServer(app)
const io = new IOServer(httServer)

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.engine('handlebars', engine());
app.set('views', './views');
app.set('view engine', 'handlebars');

app.use(cookieParser());
app.use(session({
  store: mongoStore.create({ mongoUrl: process.env.MONGO_DB_URL, ttl: 600, mongoOptions: { useNewUrlParser: true, useUnifiedTopology: true } }), // TIEMPO DE EXPIRACION DE SESION
  secret: 'secret',
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

app.use(express.static('./public'))

const loggerMiddleware = (req, res, next) => {
  const { url, baseUrl, method } = req
  logger.info(`Ruta ${method} ${baseUrl}${url} llamada`)
  return next();
}

app.use("/session", loggerMiddleware, sessionRouter);
app.use ("/api/randoms",loggerMiddleware, randomRouter)
app.use("/api/carrito", loggerMiddleware, authApiMiddleware, carritoRouter);
app.use('/api/productos',loggerMiddleware, authApiMiddleware, productosRouter);

app.use('/api/productos-graphQL',loggerMiddleware, new ProductosGraphQLController())

app.use("/api/productos-test", loggerMiddleware, authApiMiddleware, fakerRouter);



app.get('/', checkAuthentication, (req, res) => {
  res.sendFile('index.html', { root: __dirname })}
)

app.get('/chat', checkAuthentication, (req, res) => {
  res.sendFile('chat.html', { root: __dirname })}
)


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


io.on('connection', (socket) => {
  enviarTodosLosMensajes(socket.handshake.query?.email)
  socket.on(`new-message`, (mensaje) => {
    guardarMensaje(mensaje, socket.handshake.query?.email)
  });
});

/* -------------------------------------------------------------------------- */
/*                                  CHAT                                 */
/* -------------------------------------------------------------------------- */

const guardarMensaje = async (mensaje, autor) => {
  MensajesDao.save(mensaje).then(() => enviarTodosLosMensajes(autor));
}


const enviarTodosLosMensajes = async (autor) => {
  const callback = autor && autor !== 'null' ? MensajesDao.getAllByOptions({autor}) : MensajesDao.getAll(); 

  callback.then((mensajes) => {
    const chat = { id: 'chat', mensajes: [...mensajes?.map(mensaje => { return { ...mensaje._doc, _id: mensaje._id } })] };
    const result = normalize(chat, mensajesSchema.chat)
    console.log("estos son los mensajes", result.entities.mensajes)

    io.sockets.emit("messages", result)
  })
}

app.get('*', (req, res) => {
  const { url, method } = req
  logger.warn(`Ruta ${method} ${url} no implementada`)
  res.send(`Ruta ${method} ${url} no está implementada`)
})
