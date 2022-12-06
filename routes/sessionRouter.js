

import { Router } from 'express';
import { sessionController } from '../controllers/sessionController.js';

const sessionRouter = Router();

sessionRouter.post('/logout', sessionController.logout);

sessionRouter.post('/login', sessionController.login)
sessionRouter.get('/login', sessionController.loginPage);

export default sessionRouter