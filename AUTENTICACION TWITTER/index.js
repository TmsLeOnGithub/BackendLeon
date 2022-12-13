import express, { urlencoded }  from "express";
const app=express();
import session from 'express-session'
import routerPersonas from './routes/personas.js'
import routerAuthentication from './routes/authentication.js'
import routerUsers from './routes/users.js'
import path from 'path';
import passport from 'passport'
//require('./middlewares/auth.js);

const PORT=8000

app.use(session({
    secret:'secret',
    resave:true,
    saveUninitialized:true,
    cookie:{
        maxAge:60000
    }
}));
app.use(express(urlencoded({extended:true})));
app.use(express.json());
app.use(express.static(path.join(process.cwd() + '/public')));
app.use(passport.initialize());
app.use(passport.session());
app.use(routerPersonas);
app.use(routerAuthentication);
app.use(routerUsers);

console.log(path.join(process.cwd()+'/public'));

app.listen(PORT,()=>{
    console.log(`Estoy escuchando en el puerto: ${PORT}`)
})