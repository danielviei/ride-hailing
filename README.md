# Ride Hailing 🚗

Ride Hailing es una aplicación web que permite a los usuarios gestionar su flota de vehículos. Con esta aplicación, puedes tener un control total sobre tus vehículos y estar al tanto del estado actual de cada uno de ellos.

## 📋 Requisitos

Para ejecutar esta aplicación, necesitarás tener instalado lo siguiente en tu sistema:

- Node.js (v20 o superior)
- npm (v10 o superior)
- MongoDB

## 🚀 Instalación

Para instalar las dependencias del proyecto, ejecuta los siguientes comandos en tu terminal:

```bash
npm install
npm run install:backend
npm run install:frontend
```

Alternativamente, puedes instalar todas las dependencias a la vez con:

```bash
npm run install:all
```

## ⚙️ Configuración

Antes de poder ejecutar la aplicación, necesitarás establecer las siguientes variables de entorno:

### Conexión a MongoDB

- `MONGODB_HOST`: El host donde se encuentra tu base de datos MongoDB.
- `MONGODB_USERNAME`: El nombre de usuario para conectarse a la base de datos MongoDB.
- `MONGODB_PASSWORD`: La contraseña para el usuario especificado para la base de datos MongoDB.
- `MONGODB_PORT`: El puerto en el que se está ejecutando tu base de datos MongoDB.
- `MONGODB_DB`: El nombre de la base de datos MongoDB a la que te quieres conectar.

⚠️ Asegúrate de que el usuario y la contraseña proporcionados para MongoDB tienen los permisos necesarios para acceder a la base de datos especificada.

### Iniciando MongoDB con Docker

Puedes iniciar una base de datos con mongo usando el siguiente comando

```bash
docker run --name mongo-ride-hailing -p 27017:27017 -e MONGO_INITDB_ROOT_USERNAME=username -e MONGO_INITDB_ROOT_PASSWORD=password -d mongo
```

Solo recuerda usar el username y password que desees y agregarlo al archivo .env

### Secret para JWT

- `JWT_SECRET`: La clave secreta utilizada para firmar los tokens JWT. Asegúrate de que sea una cadena larga y segura.

### Orígenes aceptados para CORS

- `ACCEPTED_ORIGINS`: Una lista de orígenes permitidos para las solicitudes CORS. Debería ser una lista de URLs separadas por comas.

### URL de la API

- `VUE_APP_API_URL`: La URL base de tu API. Esto se utilizará para hacer todas las solicitudes a tu API desde el frontend.

Estas variables de entorno se pueden establecer en un archivo .env en la raíz del proyecto y con el comando:

```bash
npm run copy:env
```

Podrás copiar el archivo en ambas carpetas (backend y frontend), para que puedan ser tomadas al momento de iniciar los proyectos.

## 🎮 Uso

Para iniciar el servidor y el cliente al mismo tiempo, ejecuta:

```bash
npm run start
```

Para iniciar solo el backend, ejecuta

```bash
npm run backend:start
```

Para iniciar solo el frontend, ejecuta:

```bash
npm run frontend:serve
```

##  🔨 Desarrollo

Para iniciar el servidor y el cliente en modo de desarrollo, ejecuta

```bash
npm run dev
```

## 🏗️ Construcción

```bash
npm run build
```
