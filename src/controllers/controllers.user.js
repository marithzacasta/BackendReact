import { pool } from '../config/db.js';
import bcrypt from 'bcrypt';
import responses from '../messages/responses.js';
import jwt from 'jsonwebtoken';
import { config } from 'dotenv';
config();

export const listar = async (req, res) => {

    try {
        const data = await pool.query('CALL ListarUser();')
        responses.success(req, res, 200, data[0][0]);

    } catch (error) {
        // Se puede enviar info sensible CATCH
        // Enviar la traza a un servicio interno
        console.error('Error al lista usuarios', error.message || 'Error desconocido');
        responses.error(req, res, 500, 'Error al listar los usuarios')
    }

}


export const crearUser = async (req, res) => {
    const { name, email, password } = req.body;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Valida formato de email DEBE TENER @ y .com o .es o .org

    try {

        // 1️⃣ Validar datos
        if (!name?.trim() || !email?.trim() || !emailRegex.test(email) || !password?.trim() || password.length < 6) {
           return responses.error(req, res, 400, 'Datos inválidos')
        }

        // 2️⃣ Encriptar contraseña
        const hashPassword = await bcrypt.hash(password, 10); // El 10, es el nivel de encriptación

        // 3️⃣ Crear usuario en la BD
        const data = await pool.query('CALL CreateUser(?, ?, ?)', [name, email, hashPassword]);

        // 4️⃣ Verificar si se creó el usuario correctamente en la BD
        // data[0].affectedRows ; es una propiedad que indica cuántas filas se vieron afectadas por la consulta SQL.
        // En este caso, se espera que sea 1 si la inserción fue exitosa. Si es 0, significa que no se insertó nada.
        if (data[0].affectedRows >= 1) {
            return responses.success(req, res, 201, 'Usuario creado correctamente')
        } else {
            return responses.error(req, res, 400, 'No se pudo añadir el usuario a la Tabla')
        };

    } catch (error) {
        // console.error ; imprimirá en la consola solo el mensaje del error, en lugar del objeto entero
        // (Esto es útil para evitar la exposición de información sensible.)
        // error.message ; es una propiedad del objeto Error en JavaScript. Contiene el mensaje de error específico que describe qué salió mal.
        // || 'Error desconocido' ; Esto evita que se muestre undefined en la consola si el error no tiene un mensaje.
        console.error('Error al crear usuario:', error.message || 'Error desconocido');
        responses.error(req, res, 500, 'Error al crear el usuario')
    }
}


export const Login = async (req, res) => {

    const { email, password } = req.body;

    try {

        // 1️⃣ Validación de datos
        if (!email?.trim() || !password?.trim()) {
            return responses.error(req, res, 400, 'Email y contraseña son obligatorios')
        }

        // 2️⃣ Buscar usuario en la base de datos
        const data = await pool.query('CALL Login(?)', [email]);

        if (data[0][0].length === 0) {
            return responses.error(req, res, 404, 'Usuario no existe');
        }

        const hashPassword = data[0][0][0].hashed_password;

        // 3️⃣ Comparar contraseñas encriptadas
        // Compara la contraseña ingresada con la almacenada en la base de datos
        const match = await bcrypt.compare(password, hashPassword);
        if (!match) {
            return responses.error(req, res, 400, 'Contraseña incorrecta');
        }

        // 4️⃣ Generar token JWT
        // El payload de un token es la información que tú decides guardar dentro del token 
        // (es lo que se va a codificar y firmar).
        const payload = {
            id: data[0][0][0].id,
            name: data[0][0][0].names,
            email: data[0][0][0].email
        }

        // El JWT es codificado, NO encriptado.
        const token = jwt.sign( 
            payload, // Payload
            process.env.JWT_SECRET, // Clave secreta
            { expiresIn : process.env.JWT_expired} // Tiempo de expiración
        );

        
        // 5️⃣ Guardar token en cookie segura
        res.cookie('access_token', token, {
            httpOnly: true, // Solo accesible por HTTP (no JavaScript) la cookie solo se puede acceder desde el servidor, no desde el cliente.
            secure: false, // PRODUCCION= true, // Solo se enviará por HTTPS (en producción)
            sameSite: 'Lax', // PRODUCCION= 'None', // Solo se enviará en solicitudes del mismo sitio (previene CSRF) la ccokie solo se puede acceder en el mismo dominio
            maxAge: 86400000 // 1 hora (en milisegundos) la cookie durará 1 hora
        });

        // 6️⃣ Respuesta de éxito
        responses.success(req, res, 200, 'Usuario logueado correctamente');

    } catch (error) {
        console.error('Error al loguerase el usuario', error.message || 'Error desconocido')
        responses.error(req, res, 500, 'Error al loguearse el usuario')
    }
}

export const validateToken = (req, res) => {
    return responses.success(req, res, 200, "El token es valido" );
};

export const logout = (req, res) => {
    res.clearCookie('access_token'); // Elimina la cookie del token
    return responses.success(req, res, 200, 'Sesión cerrada correctamente');
}