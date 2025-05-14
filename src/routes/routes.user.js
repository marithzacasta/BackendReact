import { Router } from "express";
import { listar, crearUser, Login, validateToken, logout, refreshAccessToken } from "../controllers/controllers.user.js";
import { verifyToken } from "../middleware/auth.js";

const routerUser = Router();

routerUser.get('/listar', verifyToken, listar);
routerUser.post('/crear', crearUser)
routerUser.post('/login', Login)
routerUser.get('/logout', logout)
routerUser.get('/refresh', refreshAccessToken); // Esta ruta es un ejemplo de cómo usar el middleware verifyToken para proteger una ruta.
routerUser.get('/protected', verifyToken, validateToken); // Esta ruta es un ejemplo de cómo usar el middleware verifyToken para proteger una ruta. 

export default routerUser;