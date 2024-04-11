import { Router } from "express";
import { __dirname } from "../path.js";

import { routerProducts } from "./products.js";
import { routerUsers } from "./users.js";
import { routerSession } from "./sessions.js";
import { routerPrices } from "./prices.js";
import { routerTickets } from "./tickets.js"


const router = Router();

//Routes
router.use('/api/products', routerProducts);
router.use('/api/users', routerUsers);
router.use('/api/session', routerSession);
router.use('/api/prices', routerPrices);
router.use('/api/tickets', routerTickets);

export default router;