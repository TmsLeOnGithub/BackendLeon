

export default class ProductoFactory {
    constructor({ titulo, descripcion,thumbnail,precio,stock,timestamp}) {
        this.titulo = titulo
        this.descripcion = descripcion
        this.thumbnail = thumbnail
        this.precio = precio
        this.stock = stock
        this.thumbnail = timestamp
    }
}

export function asDto(producto) {
    if (Array.isArray(producto))
        return pers.map(p => new ProductoDto(p))
    else
        return new ProductoDto(producto)
}