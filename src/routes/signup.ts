import express from 'express';
import { body } from 'express-validator';
import { postSignUp } from '../controller/signup';
import User from '../models/user';

const router = express.Router();

router.post(
  '/sign-up',
  [
    body('name').notEmpty().withMessage('Please insert a name'),
    body('email')
      .isEmail()
      .withMessage('Please insert a valid e-mail')
      .custom((value, { req }) => {
        return User.findOne({ email: value }).then((user) => {
          if (user) {
            return Promise.reject('E-mail is already taken');
          }
        });
      }),
    body('password')
      .trim()
      .isLength({ min: 5 })
      .withMessage('Password should be longer then 5'),
    body('hourlyRate')
      .notEmpty()
      .isNumeric()
      .withMessage('Please insert a valid hourly rate value'),
  ],
  postSignUp
);

export default router;
