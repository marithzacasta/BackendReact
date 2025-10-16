
# 🎬 CineGalaxy - Backend

Este backend fue desarrollado con **Node.js y Express** para practicar la creación de APIs, la autenticación de usuarios y la conexión con una **base de datos MySQL**.  
Forma parte del proyecto **CineGalaxy**, que incluye un frontend en React.

## 🚀 Tecnologías utilizadas

- **Node.js + Express**
- **MySQL + mysql2**
- **JWT (JSON Web Token)**
- **Bcrypt**
- **dotenv**
- **CORS**
- **Cookie Parser**
- **Morgan**
- **Nodemon (dev)**

## 🧩 Funcionalidades principales

- Registro e inicio de sesión de usuarios.

- Encriptación de contraseñas con Bcrypt.

- Autenticación mediante JWT.

- Conexión y consultas a MySQL.

- Middleware de seguridad con CORS y cookie-parser.

- Registro de peticiones HTTP con Morgan.


## 🗄️ Base de datos

El proyecto utiliza MySQL Workbench para gestionar la base de datos.


## ▶️ Ejecución

- Clonar el repositorio
git clone https://github.com/tuusuario/cineapp-backend.git

- Instalar dependencias
npm install

- Crear el archivo .env en la raíz del proyecto con las siguientes variables
PORT = 4000

DB_USER  = 'root'
DB_PASSWORD = '123456789'
DB_HOST = 'localhost'
DB_DATABASE = 'manicure'
DB_PORT = 3306

JWT_SECRET_ACCESS = wkdneoruq230r9y39inf
JWT_EXPIRE_ACCESS = 1m

JWT_SECRET_REFRESH = nhdblbOUe3i87y3t2728
JWT_EXPIRE_REFRESH = 7d

NODE_ENV = 'development'

- Ejecutar el servidor
npm run dev

## 🧠 Aprendizajes obtenidos

Creación de una API REST con Node.js y Express.

Autenticación de usuarios con JWT.

Conexión segura a bases de datos MySQL.

Implementación de buenas prácticas en backend.

## 🧑‍💻 Desarrollado por

- [marithzacast] Proyecto creado con fines educativos para practicar desarrollo backend con Node.js y MySQL.