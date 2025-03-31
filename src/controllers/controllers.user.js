import { pool } from '../config/db.js'
import bcrypt from 'bcrypt';

export const listar = async (req, res) => {

    try {
        const data = await pool.query('CALL ListarUser();')
        res.statut(200).json({ message: data[0][0] })
    } catch (error) {
        // Se puede enviar info sensible CATCH
        // Enviar la traza a un servicio interno
        console.error(error);
        res.status(500).json({ message: 'Error al listar los usuarios' })
    }

}


export const crearUser = async (req, res) => {
    const { name, email, password } = req.body;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Valida formato de email DEBE TENER @ y .com o .es o .org

    try {

        if (!name?.trim() || !email?.trim() || !emailRegex.test(email) || !password?.trim() || password.length < 6) {
            return res.status(400).json({ message: "Datos inválidos" });
        } 

        const hashPassword = await bcrypt.hash(password, 10); // El 10, es el nivel de encriptación

        const data = await pool.query('CALL CreateUser(?, ?, ?)', [name, email, hashPassword]);

        // data[0].affectedRows ; es una propiedad que indica cuántas filas se vieron afectadas por la consulta SQL.
        // En este caso, se espera que sea 1 si la inserción fue exitosa. Si es 0, significa que no se insertó nada.
        if (data[0].affectedRows >= 1) {
            res.status(201).json({ message: 'Usuario creado correctamente' })
        } else {
            res.status(400).json({ message: 'No se pudo añadir el usuario a la Tabla' })
        };

    } catch (error) {
        // console.error ; imprimirá en la consola solo el mensaje del error, en lugar del objeto entero
        // (Esto es útil para evitar la exposición de información sensible.)
        // error.message ; es una propiedad del objeto Error en JavaScript. Contiene el mensaje de error específico que describe qué salió mal.
        // || 'Error desconocido' ; Esto evita que se muestre undefined en la consola si el error no tiene un mensaje.
        console.error('Error al crear usuario:', error.message || 'Error desconocido');
        res.status(500).json({ message: 'Error al crear el usuario' })
    }
}


export const Login = async (res, req) => {

    const [email, password] = req.doy;

    try {

    const data = await pool.query('CALLl Login(?)', [email]);


    // Compara la contraseña ingresada con la almacenada en la base de datos
    const match = await bcrypt.compare(password, hashPassword); 
        
    } catch (error) {
        console.error ('Error al loguerase el usuario', error.message || 'Error desconocido')
        res.status(500).json({ message : ' Error al loguearse el usuario'})
    }
}