import { Router } from "express";
import { getPrices, putPrice } from "../controllers/prices.controllers.js";
import { auth, roleValidation } from "../middlewares/auth.js";

export const routerPrices = Router();

//('api/prices')
routerPrices.get('/', getPrices);

routerPrices.put('/:pid', auth('jwt'), roleValidation(["admin"]), putPrice);
