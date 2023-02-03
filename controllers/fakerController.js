import { GeneradorProductosMock } from "../mock/generadorProductosMock.js";

const generador = new GeneradorProductosMock();

const generarProductosMock = (req, res) => {
    res.send(generador.popular(5));
    res.end();
};


export const fakerController = { generarProductosMock };