import {ZodError} from 'zod';
import User from '../models/user.js';
import {validateUser} from '../schemas/users.js';
import {ValidationError, DuplicateError} from '../errors.js';

export default class UserService {
  async createUser (data) {
    try {
      const validatedData = validateUser (data);

      const user = new User (validatedData);
      await user.save ();

      return user.toJSON ();
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
