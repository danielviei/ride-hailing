import {Router} from 'express';
import AuthService from '../controllers/auth.js';
import {AuthenticationError} from '../errors.js';

const authRouter = Router ();
const authService = new AuthService ();

authRouter.post ('/token', async (req, res, next) => {
  const {email, password} = req.body;
  try {
    const token = await authService.authenticate (email, password);
    return res.json (token);
  } catch (error) {
    if (error instanceof AuthenticationError) {
      return res.status (401).json ({message: error.message});
    }
    next (error);
  }
});

authRouter.post ('/refresh', async (req, res, next) => {
  const {refreshToken} = req.body;
  try {
    const token = await authService.refresh (refreshToken);
    return res.json (token);
  } catch (error) {
    if (error instanceof AuthenticationError) {
      return res.status (401).json ({message: error.message});
    }
    next (error);
  }
});

export default authRouter;
