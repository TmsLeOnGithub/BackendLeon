import generarProducto from "./generadorDeProductos.js";

export class GeneradorProductosMock {
    popular(cantidad = 5){
        const productos = [];
        for (let index = 1; index <= cantidad; index++) {
            const producto = generarProducto();
            productos.push(producto);
        }
        return productos;
    }
}