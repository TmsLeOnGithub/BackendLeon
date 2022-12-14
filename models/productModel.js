import { Schema } from "mongoose";

const ProductsCollection = "products";

const ProductSchema = new Schema(
  {
    titulo: { type: String, required: true, max: 100 },
    descripcion: { type: String, required: true, max: 150 },
    thumbnail: { type: String, required: true, max: 150 },
    precio: { type: Number, required: true },
    stock: { type: Number, required: true, default: 1 },
    timestamp: { type: String, required: true, max: 100 },
  },
  {
    virtuals: true,
  }
);

ProductSchema.set("toJSON", {
  transform: (_, response) => {
    response.id = response._id;
    delete response.__v;
    delete response._id;
    return response;
  },
});

export const ProductModel = { ProductsCollection, ProductSchema };