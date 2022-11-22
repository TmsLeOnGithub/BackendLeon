import { config } from "../../config/index.js";
import { ContenedorFileSystem } from "../../containers/ContenedorFileSystem.js";

export class CarritosDaoFileSystem extends ContenedorFileSystem {
    constructor(){
        super(`/${config.DATABASES.filesystem.CARTS_FILENAME}.txt`);
    }
}