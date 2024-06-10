import 'dotenv/config';
import mongoose from 'mongoose';

export default async function connectDB () {
  const dbURL = `mongodb://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_HOST}:${process.env.MONGODB_PORT}/${process.env.MONGODB_DB}`;
  try {
    await mongoose.connect (dbURL, {});
    console.log ('Conexión a la base de datos exitosa');
  } catch (error) {
    try {
      await mongoose.connect (`${dbURL}?authSource=admin`, {});
    } catch (error) {
      console.error ('Error al conectar a la base de datos', error);
    }
  }
}
