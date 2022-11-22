

export class Producto {
    id;
    titulo;
    precio;
    thumbnail;
    descripcion;
    timestamp;
    stock;

    constructor(titulo, precio, thumbnail,descripcion,stock){
        this.titulo = titulo;
        this.precio = precio;
        this.thumbnail = thumbnail;
        this.descripcion =descripcion;
        this.timestamp= Date.now();
        this.stock=stock;
    }
}

