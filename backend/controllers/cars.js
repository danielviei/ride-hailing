import {ZodError} from 'zod';
import Car from '../models/car.js';
import {validateCarChangeStatus, validateCar} from '../schemas/cars.js';
import {
  ValidationError,
  DuplicateError,
  CastError,
  NotFoundError,
  ServerError,
} from '../errors.js';

export default class CarService {
  async createCar (data) {
    try {
      const validatedData = validateCar (data);

      const car = new Car (validatedData);
      await car.save ();

      return car.toJSON ();
    } catch (error) {
      console.log (error);
      if (error instanceof ZodError) {
        // Error en la validación de los datos
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
      throw new ServerError ('Error del servidor');
    }
  }

  async changeStatus (id, status) {
    try {
      validateCarChangeStatus ({status});
      const car = await Car.findOneAndUpdate (
        {_id: id},
        {status},
        {new: true, runValidators: true}
      );
      if (!car) {
        throw new NotFoundError ('Carro no encontrado');
      }

      return car.toJSON ();
    } catch (error) {
      if (error instanceof ZodError) {
        const errorMessages = JSON.parse (error.message);
        const errorObject = errorMessages.reduce ((acc, curr) => {
          acc[curr.path[0]] = curr.message;
          return acc;
        }, {});
        throw new ValidationError (JSON.stringify (errorObject));
      } else if (error.name === 'CastError' && error.kind === 'ObjectId') {
        throw new CastError ('ID de carro inválido');
      } else if (error instanceof NotFoundError) {
        throw new NotFoundError ('Carro no encontrado');
      }
      throw new ServerError ('Error del servidor');
    }
  }

  async getCarById (id) {
    try {
      const car = await Car.findById (id);
      if (!car) {
        throw new NotFoundError ('Carro no encontrado');
      }
      return car;
    } catch (error) {
      if (error.name === 'CastError' && error.kind === 'ObjectId') {
        throw new CastError ('ID de carro inválido');
      } else if (error instanceof NotFoundError) {
        throw new NotFoundError ('Carro no encontrado');
      }
      throw new ServerError ('Error del servidor');
    }
  }

  async getAllCars (page, limit) {
    try {
      const skip = (page - 1) * limit;
      const cars = await Car.find ().skip (skip).limit (limit);
      const total = await Car.countDocuments ();

      return {
        next: page * limit < total ? page + 1 : null,
        previous: page > 1 ? page - 1 : null,
        results: cars,
        total: total,
      };
    } catch (error) {
      throw new ServerError ('Error del servidor');
    }
  }

  async deleteCar (id) {
    try {
      const car = await Car.findByIdAndDelete (id);
      if (!car) {
        throw new NotFoundError ('Carro no encontrado');
      }
      return car;
    } catch (error) {
      if (error.name === 'CastError' && error.kind === 'ObjectId') {
        throw new CastError ('ID de carro inválido');
      } else if (error instanceof NotFoundError) {
        throw new NotFoundError ('Carro no encontrado');
      }
      throw new ServerError ('Error del servidor');
    }
  }

  async updateCar (id, data) {
    try {
      const validatedData = validateCar (data);
      const car = await Car.findByIdAndUpdate (id, validatedData, {
        new: true,
        runValidators: true,
      });
      if (!car) {
        throw new NotFoundError ('Carro no encontrado');
      }
      return car;
    } catch (error) {
      if (error instanceof ZodError) {
        const errorMessages = JSON.parse (error.message);
        const errorObject = errorMessages.reduce ((acc, curr) => {
          acc[curr.path[0]] = curr.message;
          return acc;
        }, {});
        throw new ValidationError (JSON.stringify (errorObject));
      } else if (error.name === 'CastError' && error.kind === 'ObjectId') {
        throw new CastError ('ID de carro inválido');
      } else if (error instanceof NotFoundError) {
        throw new NotFoundError ('Carro no encontrado');
      }
      throw new ServerError ('Error del servidor');
    }
  }
}
