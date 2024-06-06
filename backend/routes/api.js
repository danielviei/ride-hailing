import {Router} from 'express';
import usersRouter from './users.js';
import authRouter from './auth.js';
import carsRouter from './cars.js';

const apiRouter = Router ();

apiRouter.use ('/auth', authRouter);
apiRouter.use ('/users', usersRouter);
apiRouter.use ('/cars', carsRouter);

export default apiRouter;
