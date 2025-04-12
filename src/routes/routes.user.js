import { Router } from "express";
import { listar, crearUser, Login } from "../controllers/controllers.user.js";

const routerUser = Router();

routerUser.get('/listar', listar);
routerUser.post('/crear', crearUser)
routerUser.post('/login', Login)

export default routerUser;