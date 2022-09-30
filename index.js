import { Contenedor } from "./containers/contenedor.js";
import { Producto} from "./models/producto.js";

const contenedor = new Contenedor('productos.txt');

async function Run(){

    console.log("Metodo save - guardar productos Televisor y Notebook")
    
    const televisor = new Producto('Televisor', 50000, '/vacio');
    const notebook = new Producto('Notebook', 20000, '/vacio');
    
   await contenedor.save(televisor);
   await contenedor.save(notebook);
    
    console.log("GetById - Recuperar el item con id = 2")
    
    const id = 2;
    const productoById = await contenedor.getById(id)
    console.log(`El item con id ${id} es ${productoById.titulo}`);

    console.log("DeleteById - Eliminar el item con id = 1");

    const idABorrar = 1;
    await contenedor.deleteById(idABorrar);
    const productos = await contenedor.getAll()
    console.log("Productos disponibles");
    console.log(productos)
    
    console.log("DeleteAll");
    
    /*await contenedor.deleteAll();
    
    const productosEliminados = await contenedor.getAll()
        console.log("Productos disponibles");
        console.log(productosEliminados)*/
    
}

Run();