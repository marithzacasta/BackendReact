import { Router } from "express";
import { listar } from "../controllers/controllers.user.js";

const routerUser = Router();

routerUser.get('/listar', listar);

export default routerUser;