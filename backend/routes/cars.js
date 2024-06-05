import {Router} from 'express';
import CarService from '../controllers/cars.js';
import {
  ValidationError,
  DuplicateError,
  CastError,
  NotFoundError,
} from '../errors.js';

const carsRouter = Router ();
const carService = new CarService ();

carsRouter.post ('/', async (req, res, next) => {
  try {
    const car = await carService.createCar (req.body);
    res.json (car);
  } catch (error) {
    if (error instanceof ValidationError) {
      return res.status (400).json (JSON.parse (error.message));
    } else if (error instanceof DuplicateError) {
      return res.status (400).json ({message: error.message});
    }
    next (error);
  }
});

carsRouter.patch ('/:id', async (req, res, next) => {
  try {
    const car = await carService.changeStatus (req.params.id, req.body.status);
    res.json (car);
  } catch (error) {
    if (error instanceof ValidationError) {
      return res.status (400).json (JSON.parse (error.message));
    } else if (error instanceof CastError) {
      return res.status (400).json ({message: error.message});
    } else if (error instanceof NotFoundError) {
      return res.status (404).json ({message: error.message});
    }
    next (error);
  }
});

export default carsRouter;
