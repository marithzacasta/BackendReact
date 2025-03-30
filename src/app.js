import express from 'express';
import {config} from 'dotenv';
import ruta from './routes/index.js';
config();

const app = express();

// Middlewares son para procesar datos antes de que lleguen a las rutas de nuestro BACKEND, 
// sin esto no se podria procesar los datos que llegan en el body
app.use(express.json());

app.set('port', process.env.PORT || 2000);

// Endpoints
app.use('/', ruta);

export default app;