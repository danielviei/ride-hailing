import {Router} from 'express';
import { expressjwt } from "express-jwt";
import usersRouter from './users.js';
import authRouter from './auth.js';
import carsRouter from './cars.js';

const secret = process.env.JWT_SECRET;
const apiRouter = Router ();

const protectRoute = expressjwt({ secret, algorithms: ['HS256'] });

apiRouter.use ('/auth', authRouter);
apiRouter.use ('/users', usersRouter);
apiRouter.use ('/cars', protectRoute, carsRouter);

export default apiRouter;
