import chat from '../db/schemas/productModel.js'
import ChatFactory  from '../factory/factorychat.js'
import { asDto } from '../factory/factorychat.js'

export default class chatRepo {
    #dao

    constructor() {
        this.#dao = chatFactory.getDao()
    }

    async getAll() {
        const chats = await this.#dao.getAll()
        return chats.map(p => new chat(p))
    }

    async getById(idBuscado) {
        const dto = await this.#dao.getById(idBuscado)
        return new chat(dto)
    }

    async add(personaNueva) {
        await this.#dao.save(asDto(chatNuevo))
    }

    async removeById(idBuscado) {
        const removida = await this.#dao.deleteById(idBuscado)
        return new chat(removido)
    }

    async removeAll() {
        await this.#dao.deleteAll()
    }
}