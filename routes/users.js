import { Router } from "express";
import { getUsers, putUser, deleteUser} from "../controllers/users.controllers.js";
import { auth, roleValidation } from "../middlewares/auth.js";

export const routerUsers = Router();

//("api/users")
routerUsers.get('/', auth('jwt'), roleValidation(["admin"]), getUsers);

routerUsers.put('/:uid', auth('jwt') , putUser);

routerUsers.delete('/:uid', auth('jwt'), roleValidation(["admin"]), deleteUser);