import { Router } from "express";
import { getTickets, postTicket, postPreference  } from "../controllers/tickets.controllers.js";
import { auth, roleValidation } from "../middlewares/auth.js";

export const routerTickets = Router();

//('api/tickets')
routerTickets.get('/:uid', auth('jwt'), roleValidation(["admin"]), getTickets);

routerTickets.post('/', postTicket);
routerTickets.post('/preference', auth('jwt'), postPreference);