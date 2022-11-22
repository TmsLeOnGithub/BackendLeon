import {ContenedorMongoDB} from '../../containers/ContenedorMongoDB.js'
import { ProductModel } from '../../models/productModel.js'

export class ProductosDaoMongoDB extends ContenedorMongoDB {

    constructor(){
        super({ name: ProductModel.ProductsCollection,  schema: ProductModel.ProductSchema })
    }

}