export class Carrito {
    id;
    timestamp;
    productos;

    constructor(){
        this.timestamp = Date.now();
        this.productos = [];
    }
}