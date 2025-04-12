import { pool } from '../config/db.js'
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'
import { config } from 'dotenv';
config();

export const listar = async (req, res) => {

    try {
        const data = await pool.query('CALL ListarUser();')
        res.status(200).json({ message: data[0][0] })

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

        // 1️⃣ Validar datos
        if (!name?.trim() || !email?.trim() || !emailRegex.test(email) || !password?.trim() || password.length < 6) {
            return res.status(400).json({ message: "Datos inválidos" });
        }

        // 2️⃣ Encriptar contraseña
        const hashPassword = await bcrypt.hash(password, 10); // El 10, es el nivel de encriptación

        // 3️⃣ Crear usuario en la BD
        const data = await pool.query('CALL CreateUser(?, ?, ?)', [name, email, hashPassword]);

        // 4️⃣ Verificar si se creó el usuario correctamente en la BD
        // data[0].affectedRows ; es una propiedad que indica cuántas filas se vieron afectadas por la consulta SQL.
        // En este caso, se espera que sea 1 si la inserción fue exitosa. Si es 0, significa que no se insertó nada.
        if (data[0].affectedRows >= 1) {
            return res.status(201).json({ message: 'Usuario creado correctamente' })
        } else {
            return res.status(400).json({ message: 'No se pudo añadir el usuario a la Tabla' })
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


export const Login = async (req, res) => {

    const { email, password } = req.body;

    try {

        // 1️⃣ Validación de datos
        if (!email?.trim() || !password?.trim()) {
            return res.status(400).json({ message: "Email y contraseña son obligatorios" });
        }

        // 2️⃣ Buscar usuario en la base de datos
        const data = await pool.query('CALL Login(?)', [email]);

        if (data.length === 0) {
            return res.status(404).json({ message: 'Usuario no existe' })
        }

        const hashPassword = data[0][0][0].hashed_password;

        // 3️⃣ Comparar contraseñas encriptadas
        // Compara la contraseña ingresada con la almacenada en la base de datos
        const match = await bcrypt.compare(password, hashPassword);
        if (!match) {
            return res.status(400).json({ message: 'Contraseña incorrecta' });
        }

        // 4️⃣ Generar token JWT
        const payload = {
            id: data[0][0][0].id,
            name: data[0][0][0].names,
            email: data[0][0][0].email
        }

        // El JWT es codificado, NO encriptado.
        const token = jwt.sign( 
            payload, // Payload
            process.env.JWT_SECRET, // Clave secreta
            { expiresIn : process.env.JWT_EXPIRED} // Tiempo de expiración
        );

        // 5️⃣ Responder con éxito
        res.status(200).json({ message: 'Login exitoso', token });

    } catch (error) {
        console.error('Error al loguerase el usuario', error.message || 'Error desconocido')
        res.status(500).json({ message: ' Error al loguearse el usuario' })
    }
}