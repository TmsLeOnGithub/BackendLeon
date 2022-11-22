import mongoose from "mongoose.js";
import { ERROR } from "sqlite3";
import estudiantes from 'estudiantes.js';

CRUD()


async function CRUD(){
    try{
        //conexion
        const URL=`mongodb://localhost:27017/ecommerce`
        let rta=await mongoose.connect(URL,{
            useNewUrlParser:true,
            useUnifiedTopology:true
        })
        console.log('Base de dato está conectada..')
    }
    catch{(ERROR,console.log('Hubo un erro con la base de datos'))}
}

//CREATE

console.log('CREATE')

const usuario= {userName:'Maximiliano',password:'qwertyui'} //Probar si da error con 7 caracteres de password
const usuarioSaveModel= new model.usuarios(usuario);
let usuarioSave=await usuarioSaveModel.save();
console.log(usuarioSave)

//LEER TODO

console.log('READ all')
let usuarios=await model.usuarios.find({})
console.log(usuarios)