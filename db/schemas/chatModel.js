import { Schema } from "mongoose";

const ChatCollection = "chat";

const ChatSchema = new Schema(
  {
    timestamp: { type: Date, default: Date.now },
    autor: { id: String, nombre: String, apellido: String, edad: Number, alias: String, avatar: String }, 
    text: String
  },
  {
    virtuals: true,
  }
);

ChatSchema.set("toJSON", {
  transform: (_, response) => {
    console.log('entro a mapear chat')

    response.id = response._id;
    delete response.__v;
    delete response._id;
    return response;
  },
});

export const ChatModel = { ChatCollection, ChatSchema,chat };