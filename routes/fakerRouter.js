import express from 'express';

import {fakerController} from '../controllers/fakerController.js';

const { Router } = express;
export const fakerRouter = Router();

fakerRouter.get('/', fakerController.generarProductosMock);

export default fakerRouter;
