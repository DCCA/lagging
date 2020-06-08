import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { body } from 'express-validator';

export const isLogin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Get the auth from request header
  // Format: Authorization: <token>
  const authHeader = req.get('Authorization');
  console.log(authHeader);
  if (!authHeader) {
    return;
  }
  const secret = process.env.SECRET || 'create-your-secret';
  const decodedToken = jwt.verify(authHeader, secret);
  if (!decodedToken) {
    return;
  }
  const taskData = req.body;
  req.body = {
    taskData,
    decodedToken: decodedToken,
  };
  next();
};
