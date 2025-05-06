import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import {config} from 'dotenv';
import ruta from './routes/index.js';
config();

const app = express();

// MIDDLEWARES
// son para procesar datos antes de que lleguen a las rutas de nuestro BACKEND, 
// sin esto no se podria procesar los datos que llegan en el body.

app.use(express.json()); // Para que el servidor pueda leer los datos en formato JSON MIDDLEWARE
app.use(morgan("dev")); // Para ver las peticiones que llegan al servidor 
app.use(cors({
    origin : 'http://localhost:5173', // URL de la aplicación cliente (frontend) que puede acceder a la API
    credentials : true, // Para permitir el envío de cookies y encabezados de autorización entre dominios
})); // Para permitir el acceso a la API desde cualquier origen (CORS)
app.use(cookieParser()); // Para poder leer las cookies que llegan al servidor MIDDLEWARE
// app.use(express.urlencoded({ extended: true })); // Para que el servidor pueda leer los datos en formato URL-encoded (formulario) MIDDLEWARE


app.set('port', process.env.PORT || 2000);

// Endpoints
app.use('/', ruta);

export default app;