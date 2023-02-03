import express from 'express';

import {carritoController} from '../controllers/carritoController.js';

const { Router } = express;
export const carritoRouter = Router();

carritoRouter.post('/', carritoController.crearCarrito);
carritoRouter.delete('/:id', carritoController.borrarCarrito);
carritoRouter.get('/:id/productos', carritoController.obtenerProductos)
carritoRouter.post('/:id/productos', carritoController.agregarProducto)
carritoRouter.delete('/:id/productos/:id_prod', carritoController.borrarProducto );
