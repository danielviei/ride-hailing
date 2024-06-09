import jwt from 'jsonwebtoken';
import User from '../models/user.js';
import {ValidationError, ServerError, AuthenticationError} from '../errors.js';

const secret = process.env.JWT_SECRET;

export default class AuthService {
  generateAccessToken (userId) {
    return jwt.sign ({userId}, secret, {expiresIn: '5m'});
  }

  generateRefreshToken (userId) {
    return jwt.sign ({userId}, secret, {expiresIn: '1d'});
  }

  async authenticate (email, password) {
    try {
      const user = await User.authenticate (email, password);
      return {
        token: this.generateAccessToken (user.id),
        refreshToken: this.generateRefreshToken (user.id),
        user: user.toJSON (),
      };
    } catch (error) {
      console.log(error);
      if (error instanceof AuthenticationError) {
        throw new AuthenticationError (error.message);
      }
      throw new ServerError ('Invalid credentials');
    }
  }

  async refresh (refreshToken) {
    try {
      if (!refreshToken) {
        throw new ValidationError ('Refresh token is required');
      }

      const user = jwt.verify (refreshToken, secret);
      return {
        accessToken: this.generateAccessToken (user.userId),
      };
    } catch (error) {
      if (error instanceof jwt.JsonWebTokenError) {
        throw new AuthenticationError ('Invalid token');
      } else if (error instanceof ValidationError) {
        throw new ValidationError ('El token de refrescamiento es requerido');
      }
      throw new ServerError ('Server error');
    }
  }
}
