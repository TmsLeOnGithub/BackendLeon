

import { Router } from 'express';
import passport from 'passport';
import { sessionController } from '../controllers/sessionController.js';

const sessionRouter = Router();

sessionRouter.post('/signup', sessionController.signup)
sessionRouter.post('/logout', sessionController.logout);

sessionRouter.post('/login', passport.authenticate('login', {failureRedirect: '/session/faillogin'}), sessionController.login)
sessionRouter.get('/login', sessionController.loginPage);
sessionRouter.get('/signup', sessionController.signupPage);
sessionRouter.get('/faillogin', sessionController.errorLoginPage);



export default sessionRouter