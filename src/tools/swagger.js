import swaggerAutogen from "swagger-autogen";
import { config } from 'dotenv';
config();

const port = process.env.PORT || 3000; // usa el puerto del .env o 3000 por defecto

const doc = {
  info: {
    title: "BACKEND",
    description: "Manejo de usuarios y herramientas",
  },
  host: `localhost:${port}/api`,
  schemes: ["http"], // o ["https"] si usas SSL
  definitions: {}, // puedes definir aquí tus modelos si quieres
};

const outputFile = "./swagger-output.json"; // archivo que se generará
const routes = [
  "../routes/routes.user.js",
];

// Generar el archivo JSON automáticamente
swaggerAutogen()(outputFile, routes, doc);
