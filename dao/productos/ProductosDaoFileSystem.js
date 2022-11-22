import { config } from "../../config/index.js";
import { ContenedorFileSystem } from "../../containers/ContenedorFileSystem.js";

export class ProductosDaoFileSystem extends ContenedorFileSystem {
    constructor(){
        super(`/${config.DATABASES.filesystem.PRODUCTS_FILENAME}.txt`);
    }
}