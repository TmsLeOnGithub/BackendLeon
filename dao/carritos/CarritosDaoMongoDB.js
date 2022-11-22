import { ContenedorMongoDB } from '../../containers/ContenedorMongoDB.js'
import { CarritoModel } from '../../models/carritoModels.js'

export class CarritosDaoMongoDB extends ContenedorMongoDB {
    constructor() {
        super({ name: CarritoModel.CarritoCollection, schema: CarritoModel.CarritoSchema })
    }
}