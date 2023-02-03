import express from 'express';

import {productosController} from '../controllers/productosController.js';

const { Router } = express;
export const productosRouter = Router();

productosRouter.get('/', productosController.obtenerProductos);

productosRouter.get('/:id', productosController.obtenerProducto)

productosRouter.post('/', productosController.crearProducto)

productosRouter.put('/:id', productosController.actualizarProducto)

productosRouter.delete('/:id', productosController.borrarProducto);