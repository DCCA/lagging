import { Request, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export const isLogin = (req: Request, res: Response, next: NextFunction) => {
  // Get the auth from request header
  const authHeader = req.get('Authorization');
  next();
};
