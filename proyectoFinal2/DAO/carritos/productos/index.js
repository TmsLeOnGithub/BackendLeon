import { ContainerFilesystem } from "../Containers/index.js";
//import { config } from "../config/index.js"

const ProductDao = new containerFilesystem(
    config.DATABASES.filesystem.PRODUCTS_FILENAME
);
const CartDao= new containerFilesystem(
    config.DATABASES.filesystem.CARTS_FILENAME
);

export { ProductDao,CartDao}