import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';
import bcrypt from 'bcrypt';
import User from '../models/user';
import jwt from 'jsonwebtoken';

export const postLogin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Validate inputs
  const result = validationResult(req);
  console.log(result);

  if (!result.isEmpty()) {
    return res.status(401).json(result);
  }
  // Extract data
  const { email, password } = req.body;
  console.log(email, password);

  try {
    const user = await User.findOne({ email: email });
    console.log(user);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    const isEqual = await bcrypt.compare(password, user.password);
    if (isEqual) {
      const secret = process.env.SECRET || 'create-your-secret';
      console.log(secret);
      const token = jwt.sign(
        {
          email: user.email,
          userId: user._id,
        },
        secret,
        {
          expiresIn: '5h',
        }
      );
      return res.status(200).json({
        token: token,
        userId: user._id.toString(),
      });
    } else {
      return res.status(401).json({
        message: 'Wrong password',
      });
    }
  } catch (error) {
    return res.status(500).json(error);
  }
};
