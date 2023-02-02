import { ProductModel } from '../../dao/schemas/productModel.js';
import { ContenedorMongoDB } from '../containers/ContenedorMongoDB.js';

export class ProductosDaoMongoDB extends ContenedorMongoDB {

    constructor(){
        super({ name: ProductModel.ProductsCollection,  schema: ProductModel.ProductSchema })
    }

}