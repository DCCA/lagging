import express from 'express';
import { body } from 'express-validator';
import * as taskController from '../controller/task';
import { isLogin } from '../middleware/is-auth';

const router = express.Router();

// Create task
router.post(
  '/create-task',
  isLogin,
  [
    body('taskData.name')
      .notEmpty()
      .withMessage('Please input a name for the task'),
    // TODO - Create a custom validation date for this fields
  ],
  taskController.postCreateTask
);
// Edit task
router.post('/edit-task');
// Delete task
router.post('/delete-task');

export default router;
