import express from 'express'
import { Server as IOServer} from 'socket.io'
import  { Server as HttpServer} from 'http';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app= express();
const httServer= new HttpServer(app)
const io = new IOServer (httServer)

app.use (express.static ('./public'))
app.get ('/',(req,res)=>{
    res.sendFile ('index.html', {root: __dirname})
})

httServer.listen(3000,()=> console.log ('Server ON  :) '))

/*const mensajes = [
    {author: 'Jose', text: `Hola don pepito`},
    {author: 'Pepito', text: `Hola don Jose`},
    {author: 'Jose', text: `Pasó usted por casa?`},
    {author: 'Pepito', text: `Por su casa yo pasé`},

]*/

io.on ('connection', (socket)=>{
    console.log('Se conectó un cliente')
    socket.emit ('mi mensaje', mensajes)

    socket.on (`new-message`, data =>{
        mensajes.push(data);
        io.sockets.emit('messages',mensajes);
    });
})

io.on ('notificacion', data=>{
  console.log(data)
})