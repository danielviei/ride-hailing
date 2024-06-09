# Ride Hailing

Ride Hailing es una aplicación web que permite a los usuarios gestionar su flota de vehículos. Puedes ver qué vehículos tienes y el estado actual de cada uno de ellos.

## Requisitos

- Node.js (v20 o superior)
- npm (v10 o superior)
- MongoDB

## Instalación

Para instalar las dependencias del proyecto, ejecuta los siguientes comandos:

```bash
npm install
npm run install:backend
npm run install:frontend
```

puedes instalar todas las dependencias a la vez con:

```bash
npm run install:all
```

## Configuración

Para configurar la aplicación, necesitarás establecer las siguientes variables de entorno:

### Conexión a MongoDB

- `MONGODB_HOST`: El host donde se encuentra tu base de datos MongoDB.
- `MONGODB_USERNAME`: El nombre de usuario para conectarse a la base de datos MongoDB.
- `MONGODB_PASSWORD`: La contraseña para el usuario especificado para la base de datos MongoDB.
- `MONGODB_PORT`: El puerto en el que se está ejecutando tu base de datos MongoDB.
- `MONGODB_DB`: El nombre de la base de datos MongoDB a la que te quieres conectar.

Asegúrate de que el usuario y la contraseña proporcionados para MongoDB tienen los permisos necesarios para acceder a la base de datos especificada.

### Secret para JWT

- `JWT_SECRET`: La clave secreta utilizada para firmar los tokens JWT. Asegúrate de que sea una cadena larga y segura.

### Orígenes aceptados para CORS

- `ACCEPTED_ORIGINS`: Una lista de orígenes permitidos para las solicitudes CORS. Debería ser una lista de URLs separadas por comas.

### URL de la API

- `VUE_APP_API_URL`: La URL base de tu API. Esto se utilizará para hacer todas las solicitudes a tu API desde el frontend.

## Uso

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

Para iniciar el servidor y el cliente en modo de desarrollo, ejecuta

## Desarrollo

```bash
npm run dev
```

## Construcción

```bash
npm run build
```
