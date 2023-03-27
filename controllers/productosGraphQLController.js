import { graphqlHTTP } from 'express-graphql';
import { buildSchema } from 'graphql';
import { productosService } from '../negocio/productosService.js';

const schema = buildSchema(`
  input ProductoInput {
    titulo: String,
    precio: Float,
    thumbnail: String,
    descripcion: String,
    stock: Float
  }
  type Producto {
    id: ID!,
    titulo: String,
    precio: Float,
    thumbnail: String,
    descripcion: String,
    timestamp: Float,
    stock: Float
  }
  type Query {
    obtenerProductos: [Producto],
    obtenerProducto(id: ID!): Producto
  }
  type Mutation {
    crearProducto(datos: ProductoInput): Producto,
    actualizarProducto(id: ID!, datos: ProductoInput): Producto,
    borrarProducto(id: ID!): Producto
  }
`);


export default class ProductosGraphQLController {
    constructor() {
        const { obtenerProductos, actualizarProducto, borrarProducto, crearProducto, obtenerProducto } = productosService;

        return graphqlHTTP({
            schema: schema,
            rootValue: {
                obtenerProducto: ({id}) => obtenerProducto(id),
                obtenerProductos,
                crearProducto: ({datos}) => crearProducto(datos),
                actualizarProducto: ({id, datos}) => actualizarProducto(id, datos),
                borrarProducto: ({id}) => borrarProducto(id)
            },
            graphiql: true,
        })
    }
}