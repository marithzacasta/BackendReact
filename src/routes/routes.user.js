import { Router } from "express";
import { listar, crearUser, Login, validateToken } from "../controllers/controllers.user.js";
import { verifyToken } from "../middleware/auth.js";

const routerUser = Router();

routerUser.get('/listar', listar);
routerUser.post('/crear', crearUser)
routerUser.post('/login', Login)
routerUser.post('/protected', verifyToken, validateToken);

export default routerUser;