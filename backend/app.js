import express, {json} from 'express';
import jwt from 'jsonwebtoken';
import {UnauthorizedError} from 'express-jwt';
import 'dotenv/config';
import apiRouter from './routes/api.js';
import connectDB from './db.js';
import corsMiddleware from './middlewares/cors.js';

const app = express ();

app.disable ('x-powered-by');
app.use (json ());
app.use (corsMiddleware);
app.use ('/api', apiRouter);
app.use ((err, req, res, next) => {
  if (
    err instanceof jwt.JsonWebTokenError ||
    err instanceof UnauthorizedError
  ) {
    return res.status (401).json ({message: 'Token inválido'});
  }
  console.error (err);
  return res.status (500).json ({message: 'Error del servidor'});
});

async function startApp () {
  const port = process.env.PORT || 3000;
  try {
    await connectDB ();
    app.listen (port, () =>
      console.log (`Servidor corriendo en http://localhost:${port}`)
    );
  } catch (error) {
    console.error ('Error de conexión a la base de datos', error);
  }
}

startApp ();
