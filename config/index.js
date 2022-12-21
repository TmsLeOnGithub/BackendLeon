import dotenv from "dotenv";
dotenv.config();

const PRODUCTS_FILENAME = "productos";
const CARTS_FILENAME = "carritos";
const MESSAGES_FILENAME = "mensajes";

const FONDO= process.env.FONDO////////
const FRENTE= process.env.FRENTE//////
const env=process.env         ///////////
const PUERTO = env.PUERTO||'0'////////////
const MODO = env.MODO||'prod'/////////////
const DEBUG = env.DEBUG==='true'//////////
console.log({PUERTO,MODO,DEBUG})////////////

console.log({FONDO,FRENTE})

const config = {
  SERVER: {
    PORT: process.env.PORT || 8080,
    SELECTED_DATABASE: process.env.SELECTED_DB ?? "filesystem",
  },
  DATABASES: {
    filesystem: {
      PRODUCTS_FILENAME,
      CARTS_FILENAME,
      MESSAGES_FILENAME
    },
    mongo: {
      url: process.env.MONGO_DB_URL,
      dbName: process.env.MONGO_DB_NAME,
    },
  },
};

export { config };