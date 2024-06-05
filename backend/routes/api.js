import {Router} from 'express';
import usersRouter from './users.js';
import authRouter from './auth.js';

const apiRouter = Router ();

apiRouter.use ('/auth', authRouter);
apiRouter.use ('/users', usersRouter);

export default apiRouter;
