import mongoose from "mongoose";
import { config } from "../../config/index.js";

const init = async () => {
  try {
    mongoose.connect(config.DATABASES.mongo.url, {
      dbName: config.DATABASES.mongo.dbName,
    });
    console.log('Base de dato está conectada..')
  } catch (error) {
    console.log(error);
  }
};

export const MongoDBService = {
  init,
};