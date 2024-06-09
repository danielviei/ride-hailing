import {expressjwt} from 'express-jwt';
import {Router} from 'express';
import CarService from '../controllers/cars.js';
import {
  ValidationError,
  DuplicateError,
  CastError,
  NotFoundError,
} from '../errors.js';

const secret = process.env.JWT_SECRET;
const protectRoute = expressjwt ({secret, algorithms: ['HS256']});

const carsRouter = Router ();
const carService = new CarService ();

carsRouter.get ('/', async (req, res, next) => {
  try {
    const page = parseInt (req.query.page) || 1;
    const limit = parseInt (req.query.limit) || 10;
    const cars = await carService.getAllCars (page, limit);
    res.json (cars);
  } catch (error) {
    next (error);
  }
});

carsRouter.get ('/:id', async (req, res, next) => {
  try {
    const car = await carService.getCarById (req.params.id);
    res.json (car);
  } catch (error) {
    if (error instanceof CastError) {
      return res.status (400).json ({message: error.message});
    } else if (error instanceof NotFoundError) {
      return res.status (404).json ({message: error.message});
    }
    next (error);
  }
});

carsRouter.post ('/', protectRoute, async (req, res, next) => {
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

carsRouter.patch ('/:id', protectRoute, async (req, res, next) => {
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

carsRouter.put ('/:id', protectRoute, async (req, res, next) => {
  try {
    const car = await carService.updateCar (req.params.id, req.body);
    return res.json (car);
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

carsRouter.delete ('/:id', protectRoute, async (req, res, next) => {
  try {
    await carService.deleteCar (req.params.id);
    res.json ({message: 'Carro eliminado'});
  } catch (error) {
    if (error instanceof CastError) {
      return res.status (400).json ({message: error.message});
    } else if (error instanceof NotFoundError) {
      return res.status (404).json ({message: error.message});
    }
    next (error);
  }
});

export default carsRouter;
