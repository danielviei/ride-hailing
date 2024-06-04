import express from 'express';
import connectDB from './db.js';
import 'dotenv/config';

const app = express ();

app.get ('/', (req, res) => res.send ('Hola Mundo!'));

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
