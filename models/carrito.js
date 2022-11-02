export class Carrito {
    id;
    timestamp;
    productos;

    constructor(id){
        this.id = id;
        this.timestamp = Date.now();
        this.productos = [];
    }
}