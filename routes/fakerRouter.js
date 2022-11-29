import { GeneradorProductosMock } from "../mock/generadorProductosMock.js";
import express from "express";


const { Router } = express;
export const fakerRouter = Router();

const generador = new GeneradorProductosMock();

fakerRouter.get('/', (req, res) => {
    res.send(generador.popular(5));
    res.end();
});

export default fakerRouter;
