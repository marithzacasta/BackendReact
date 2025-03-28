import { Router } from "express";
import routerUser from "./routes.user.js";

const ruta = Router();

ruta.use('/api', routerUser)

export default ruta;