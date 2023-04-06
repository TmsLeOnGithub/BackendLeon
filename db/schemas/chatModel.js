import { Schema } from "mongoose";

const ChatCollection = "chat";

const ChatSchema = new Schema(
  {
    timestamp: { type: Date, default: Date.now },
    autor: String, 
    text: String
  },
  {
    virtuals: true,
  }
);

ChatSchema.set("toJSON", {
  transform: (_, response) => {
    response.id = response._id;
    delete response.__v;
    delete response._id;
    return response;
  },
});

export const ChatModel = { ChatCollection, ChatSchema };