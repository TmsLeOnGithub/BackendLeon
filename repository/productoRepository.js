import products from '../db/schemas/productModel.js'
import productsFactory from '../factory/factoryproducts.js'
import { asDto } from '../factory/factoryproducts.js'

export default class productsRepo {
    #dao

    constructor() {
        this.#dao = productsFactory.getDao()
    }

    async getAll() {
        const productss = await this.#dao.getAll()
        return productss.map(p => new products(p))
    }

    async getById(idBuscado) {
        const dto = await this.#dao.getById(idBuscado)
        return new products(dto)
    }

    async add(personaNueva) {
        await this.#dao.save(asDto(productsNuevo))
    }

    async removeById(idBuscado) {
        const removida = await this.#dao.deleteById(idBuscado)
        return new products(removido)
    }

    async removeAll() {
        await this.#dao.deleteAll()
    }
}