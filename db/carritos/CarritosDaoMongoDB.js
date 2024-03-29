import { CarritoModel } from '../../db/schemas/carritoModels.js';
import { ContenedorMongoDB } from '../containers/ContenedorMongoDB.js';


export class CarritosDaoMongoDB extends ContenedorMongoDB {
    constructor() {
        super({ name: CarritoModel.CarritoCollection, schema: CarritoModel.CarritoSchema })
    }
}