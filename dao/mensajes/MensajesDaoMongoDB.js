import {ContenedorMongoDB} from '../../containers/ContenedorMongoDB.js'
import { ChatModel } from '../../models/chatModel.js'

export class MensajesDaoMongoDB extends ContenedorMongoDB {
    constructor(){
        super({ name: ChatModel.ChatCollection,  schema: ChatModel.ChatSchema })
    }
}