import { config } from "../config/index.js";

import {  CarritosDaoMongoDB } from "./carritos/CarritosDaoMongoDB.js";
import {  CarritosDaoFileSystem } from "./carritos/CarritosDaoFileSystem.js";
import {  ProductosDaoMongoDB } from "./productos/ProductosDaoMongoDB.js";
import {  ProductosDaoFileSystem } from "./productos/ProductosDaoFileSystem.js";
import { MongoDBService } from "../services/MongoDBService/index.js";
import { MensajesDaoMongoDB } from "./mensajes/MensajesDaoMongoDB.js";
import { UsersDaoMongoDB } from "./Users/UsersDaoMongoDB.js";

const getSelectedDaos = () => {
  switch (config.SERVER.SELECTED_DATABASE) {
    case "mongo": {
      MongoDBService.init();
      return {
        ProductDao: new ProductosDaoMongoDB(),
        CartDao: new CarritosDaoMongoDB(),
        MensajesDao: new MensajesDaoMongoDB(),
        UsersDao: new UsersDaoMongoDB(),
      };
    }
    case "filesystem": {
      return {
        ProductDao: new ProductosDaoFileSystem(),
        CartDao: new CarritosDaoFileSystem(),
        MensajesDao: new MensajesDaoMongoDB(),
        UsersDao: new UsersDaoMongoDB(),
      };
    }
}
};

const { ProductDao, CartDao, MensajesDao, UsersDao } = getSelectedDaos();

export { ProductDao, CartDao, UsersDao, MensajesDao };

     

      
  



 

