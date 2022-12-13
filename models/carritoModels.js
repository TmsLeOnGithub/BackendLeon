import { Schema } from "mongoose";

const CarritoCollection = "carrito";

const CarritoSchema = new Schema(
  {
    timestamp: { type: String, required: true, max: 100 },
    productos: [{ type: Schema.Types.ObjectId, ref: "productos", }],
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