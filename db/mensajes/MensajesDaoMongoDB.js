import { ChatModel } from '../../db/schemas/chatModel.js';
import { ContenedorMongoDB } from '../containers/ContenedorMongoDB.js';

export class MensajesDaoMongoDB extends ContenedorMongoDB {
    constructor(){
        super({ name: ChatModel.ChatCollection,  schema: ChatModel.ChatSchema })
    }

    async getAllByOptions(options) {
        console.log('options', options)
        const response = await this.model.find(options).exec();
        return response;
    }
}