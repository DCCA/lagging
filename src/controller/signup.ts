import { Response, Request, NextFunction } from 'express';
import { validationResult } from 'express-validator';
import User from '../models/user';
import bcrypt from 'bcrypt';

export const postSignUp = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Validate all fields
  const result = validationResult(req);

  if (!result.isEmpty()) {
    return res.status(422).json(result);
  }
  // Get data from body
  const { name, email, password, hourlyRate = 0 } = req.body;

  try {
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      name: name,
      email: email,
      password: hashedPassword,
      hourlyRate: hourlyRate,
    });

    const newUser = await user.save();

    return res.status(201).json(newUser);
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      message: 'Something went wrong',
    });
  }
};
