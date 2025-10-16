
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

El proyecto utiliza MySQL como sistema de gestión de base de datos.

📍 El script de creación y datos iniciales se encuentra en:

src/database/manicure_users.sql

💡 Para restaurar la base de datos:

1️⃣ Abre MySQL Workbench.
2️⃣ Conéctate a tu servidor local.
3️⃣ Crea una base de datos llamada manicure.
4️⃣ Importa el archivo SQL:

Menú → Server → Data Import → Import from Self-Contained File

Selecciona el archivo manicure_users.sql

Da clic en Start Import

Una vez importada, asegúrate de que las credenciales en el archivo .env coincidan con tu configuración local de MySQL.


## ▶️ Ejecución Localmente

- Clonar el repositorio
https://github.com/marithzacasta/BackendReact.git

- Instalar dependencias
npm install

- Crear el archivo .env en la raíz del proyecto con las siguientes variables
PORT = 4000

DB_USER  = 'root'
DB_PASSWORD = tu_contraseña
DB_HOST = 'localhost'
DB_DATABASE = 'manicure'
DB_PORT = 3306

JWT_SECRET_ACCESS = tu_clave_access
JWT_EXPIRE_ACCESS = 1m

JWT_SECRET_REFRESH = tu_clave_refresh
JWT_EXPIRE_REFRESH = 7d


- Ejecutar el servidor
npm run dev


## 🧠 Aprendizajes obtenidos

Creación de una API REST con Node.js y Express.

Autenticación de usuarios con JWT.

Conexión segura a bases de datos MySQL.

Implementación de buenas prácticas en backend.


## 🧑‍💻 Desarrollado por

- [marithzacasta] Proyecto creado con fines educativos para practicar desarrollo backend con Node.js y MySQL.