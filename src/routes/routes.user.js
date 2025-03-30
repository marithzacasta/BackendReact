import { Router } from "express";
import { listar, crearUser } from "../controllers/controllers.user.js";

const routerUser = Router();

routerUser.get('/listar', listar);
routerUser.post('/crear', crearUser)

export default routerUser;