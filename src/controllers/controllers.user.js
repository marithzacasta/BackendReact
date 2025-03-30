import {pool} from '../config/db.js'
import bcrypt from 'bcrypt';

export const listar = async (req, res) => {
    
    try {
        const data = await pool.query('CALL ListarUser();')
        res.statut(200).json({message: data[0][0]})
    } catch (error) {
        // Se puede enviar info sensible CATCH
        // Enviar la traza a un servicio interno
        console.error(error);
        res.status(500).json({message: 'Error al listar los usuarios'})
    }

}


export const crearUser = async (req, res) => {
    const {name, email, password} = req.body;

    const hashPassword = await bcrypt.hash(password, 10); // El 10, es el nivel de encriptación

    try {
        const data = await pool.query('CALL CreateUser(?, ?, ?)', [name, email, hashPassword]);
        res.status(201).json({message: 'Usuario creado correctamente'})
    } catch (error) {
        console.log(error);
        res.status(200).json({message: 'Error al crear el usuario'})
    }
}

