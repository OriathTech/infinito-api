import { Router } from "express";
import { getSession, postLogin, postRegister, postRegisterConfirmation, postForgotPassword, postResetPassword } from "../controllers/sessions.controllers.js";
import { auth } from "../middlewares/auth.js";

export const routerSession = Router();

//("api/session")
routerSession.get('/', auth('jwt'), getSession);

routerSession.post('/login', postLogin);
routerSession.post('/register', postRegister);
routerSession.post('/confirmation', postRegisterConfirmation);
routerSession.post('/forgot', postForgotPassword);
routerSession.post('/reset', postResetPassword);