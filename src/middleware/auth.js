import jwt from 'jsonwebtoken';
import responses from '../messages/responses.js';
import { config } from 'dotenv';
config();

export const verifyToken = (req, res, next) => {
    const token = req.cookies.access_token;
    
    if (!token) {
        return responses.error(req, res, 401, 'Token no proporcionado');
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_ACCESS) // Verifica el token con la clave secreta
        // Si el token es válido, se decodifica y se pasa a la request
        
        req.user = decoded; // Pasa los datos del token a la request
        return next(); // Llama al siguiente middleware o ruta
        
    } catch (error) {
        return responses.error(req, res, 401, 'Token no válido');
    }
}