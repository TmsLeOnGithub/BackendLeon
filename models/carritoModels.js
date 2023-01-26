import { Schema } from "mongoose";
import { ProductModel } from "./productModel.js";

const CarritoCollection = "carritos";

const CarritoSchema = new Schema(
  {
    timestamp: { type: String, required: true, max: 100 },
    productos: [ProductModel.ProductSchema],
  },
  {
    virtuals: true,
  }
);


CarritoSchema.set("toJSON", {
  transform: (_, response) => {
    response.id = response._id;
    delete response.__v;
    delete response._id;
    return response;
  },
});



export const CarritoModel = { CarritoCollection, CarritoSchema };