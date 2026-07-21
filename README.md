#  Gestor de Turnos - Dashboard Administrativo

Un sistema integral Fullstack para la gestión de clientes y citas, diseñado como un panel administrativo para negocios de servicios. Desarrollado con una arquitectura MVC limpia y consultas relacionales optimizadas.

##  Tecnologías Utilizadas

**Frontend:**
* React + Vite (Entorno de desarrollo rápido)
* Bootstrap (Diseño responsivo y componentes de UI)
* Axios (Consumo de API HTTP)
* React Router DOM (Navegación sin recargas)

**Backend:**
* Node.js + Express (Servidor y creación de API REST)
* MySQL 2 (Base de datos relacional con promesas `async/await`)
* CORS & Dotenv (Seguridad y variables de entorno)

##  Características Principales

* **Arquitectura MVC (Modelo-Vista-Controlador):** Lógica de negocio, rutas y accesos a datos completamente desacoplados en el backend.
* **Consultas Relacionales Avanzadas:** Uso de `JOINs` en MySQL para cruzar información de clientes, catálogo de servicios y estados de las citas en una sola petición.
* **Gestión de Estados Reactiva:** Interfaz dinámica que actualiza el estado de los turnos en tiempo real mediante peticiones `PATCH`.
* **Modales y Formularios:** Ventanas emergentes nativas para la creación fluida de nuevos registros.

##  Instalación y Configuración Local

Sigue estos pasos para levantar el proyecto en tu máquina local.

### 1. Clonar el repositorio

git clone https://github.com/KevinCruz01/gestor-turnos.git
cd gestor-turnos

### 2. Configurar la Base de Datos
* Crea una base de datos en tu gestor MySQL llamada `gestor_turnos`.
* Ejecuta el script SQL incluido en `backend/database.sql` para generar las tablas.
/////////////////////////////////////////////////////////////////////////////////////////////////
### 3. Configurar el Backend

cd backend
npm install
/////////////////////////////////////////////////////////////////////////////////////////////////
* Crea un archivo `.env` en la carpeta `backend` basado en tus credenciales locales de MySQL:
  # Configuracion de base de datos
  
  DB_HOST=localhost
  DB_USER=root
  DB_PASSWORD=tu_password
  DB_NAME=gestor_turnos
  DB_PORT=db_port
  
 # Configuracion del servidor

PORT=3000

/////////////////////////////////////////////////////////////////////////////////////////////////
### 4. Configurar el Frontend
Abre una nueva terminal en la raíz del proyecto.

cd frontend
npm install
npm run dev
/////////////////////////////////////////////////////////////////////////////////////////////////
* Visita `http://localhost:5173` en tu navegador.


## Autor

**Kevin Cruz** - Desarrollador de Software enfocado en el ecosistema React, Node.js