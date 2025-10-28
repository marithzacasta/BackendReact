import { Router } from "express";
import routerUser from "./routes.user.js";
import swaggerUi from "swagger-ui-express";
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const swaggerFile = require("../tools/swagger-output.json");
// import swaggerFile from "../tools/swagger-output.json" assert { type: "json" };

const ruta = Router();

ruta.use('/api', routerUser)

// documentación Swagger
ruta.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));

export default ruta;