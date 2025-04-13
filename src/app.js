import express from 'express';
import morgan from 'morgan';
import {config} from 'dotenv';
import ruta from './routes/index.js';
config();

const app = express();

// MIDDLEWARES
// son para procesar datos antes de que lleguen a las rutas de nuestro BACKEND, 
// sin esto no se podria procesar los datos que llegan en el body.

app.use(express.json()); // Para que el servidor pueda leer los datos en formato JSON
app.use(morgan("dev")); // Para ver las peticiones que llegan al servidor

app.set('port', process.env.PORT || 2000);

// Endpoints
app.use('/', ruta);

export default app;