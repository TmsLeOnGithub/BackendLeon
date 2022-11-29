import { config } from "../config/index.js";

import {  CarritosDaoMongoDB } from "./carritos/CarritosDaoMongoDB.js";
import {  CarritosDaoFileSystem } from "./carritos/CarritosDaoFileSystem.js";
import {  ProductosDaoMongoDB } from "./productos/ProductosDaoMongoDB.js";
import {  ProductosDaoFileSystem } from "./productos/ProductosDaoFileSystem.js";
import { MongoDBService } from "../services/MongoDBService/index.js";
import { MensajesDaoMongoDB } from "./mensajes/MensajesDaoMongoDB.js";

const getSelectedDaos = () => {
  switch (config.SERVER.SELECTED_DATABASE) {
    case "mongo": {
      MongoDBService.init();
      return {
        ProductDao: new ProductosDaoMongoDB(),
        CartDao: new CarritosDaoMongoDB(),
        MensajesDao: new MensajesDaoMongoDB()
      };
    }
    case "filesystem": {
      return {
        ProductDao: new ProductosDaoFileSystem(),
        CartDao: new CarritosDaoFileSystem(),
      };
    }
  }
};

const { ProductDao, CartDao, MensajesDao } = getSelectedDaos();

export { ProductDao, CartDao, MensajesDao };