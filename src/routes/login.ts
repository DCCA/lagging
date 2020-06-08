import express from 'express';
import { body } from 'express-validator';
import * as loginController from '../controller/login';

const router = express.Router();

router.post(
  '/log-in',
  [
    body('email').isEmail().withMessage('Insert a valid e-mail'),
    body('password')
      .trim()
      .isLength({ min: 5 })
      .withMessage('E-mail or password is invalid'),
  ],
  loginController.postLogin
);

export default router;
