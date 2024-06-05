import {Router} from 'express';
import UserService from '../controllers/users.js'
import {ValidationError, DuplicateError} from '../errors.js';

const usersRouter = Router ();

const userService = new UserService ();

usersRouter.post ('/', async (req, res, next) => {
  try {
    const user = await userService.createUser (req.body);
    res.json (user);
  } catch (error) {
    if (error instanceof ValidationError) {
      return res.status (400).json (JSON.parse(error.message));
    } else if (error instanceof DuplicateError) {
      return res.status (400).json ({message: error.message});
    }
    next (error);
  }
});

export default usersRouter;
