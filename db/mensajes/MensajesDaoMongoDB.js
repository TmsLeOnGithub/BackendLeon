import { ChatModel } from '../../db/schemas/chatModel.js';
import { ContenedorMongoDB } from '../containers/ContenedorMongoDB.js';

export class MensajesDaoMongoDB extends ContenedorMongoDB {
    constructor(){
        super({ name: ChatModel.ChatCollection,  schema: ChatModel.ChatSchema })
    }
}