import { Router } from "express";
import { getProducts, postProduct, getProduct, putProduct, putProductThumbnail, deleteProduct } from "../controllers/products.controllers.js";
import { auth, roleValidation } from "../middlewares/auth.js";

export const routerProducts = Router();

//('api/products')
routerProducts.get('/', getProducts);
routerProducts.get('/:pid', getProduct);

routerProducts.post('/', auth('jwt'), roleValidation(["admin"]), postProduct);

routerProducts.put('/:pid', auth('jwt'), roleValidation(["admin"]), putProduct);
routerProducts.put('/:pid', auth('jwt'), roleValidation(["admin"]), putProductThumbnail);

routerProducts.delete('/:pid', auth('jwt'), roleValidation(["admin"]),deleteProduct);