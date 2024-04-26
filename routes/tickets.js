import { Router } from "express";
import { getTickets, getUserTickets, postTicket, putTicket, deleteTicket  } from "../controllers/tickets.controllers.js";
import { auth, roleValidation } from "../middlewares/auth.js";

export const routerTickets = Router();

//('api/tickets')
routerTickets.get('/', auth('jwt'), roleValidation(["admin"]), getTickets);
routerTickets.get('/user/:uid', auth('jwt'), roleValidation(["admin"]), getUserTickets);

routerTickets.post('/', postTicket);

routerTickets.put('/:tid', putTicket);

routerTickets.delete('/:tid', auth('jwt'), roleValidation(["admin"]), deleteTicket);