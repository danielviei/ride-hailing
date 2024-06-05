import express, {json} from 'express';
import 'dotenv/config';
import apiRouter from './routes/api.js';
import connectDB from './db.js';

const app = express ();

app.disable ('x-powered-by');
app.use (json ());
app.use ('/api', apiRouter);
app.use ((err, req, res, next) => {
  console.error (err);
  res.status (500).json ({message: 'Error del servidor'});
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
