import {ZodError} from 'zod';
import Car from '../models/car.js';
import {validateCarChangeStatus, validateCar} from '../schemas/cars.js';
import {
  ValidationError,
  DuplicateError,
  CastError,
  NotFoundError,
} from '../errors.js';

export default class CarService {
  async createCar (data) {
    try {
      const validatedData = validateCar (data);

      const car = new Car (validatedData);
      await car.save ();

      return car.toJSON ();
    } catch (error) {
      // Error en la validación de los datos
      if (error instanceof ZodError) {
        const errorMessages = JSON.parse (error.message);
        const errorObject = errorMessages.reduce ((acc, curr) => {
          acc[curr.path[0]] = curr.message;
          return acc;
        }, {});
        throw new ValidationError (JSON.stringify (errorObject));
      } else if (error.code === 11000) {
        // Código de error 11000 indica un error de duplicado en MongoDB
        throw new DuplicateError ('El correo electrónico ya está en uso.');
      }
      console.error (error);
      throw new ServerError ('Error del servidor');
    }
  }
}
