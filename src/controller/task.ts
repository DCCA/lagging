import { Request, Response, NextFunction } from 'express';
import Task from '../models/task';
import User from '../models/user';

export const postCreateTask = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Validate inputs
  const { decodedToken, taskData } = req.body;
  console.log(decodedToken);
  const {
    name,
    category,
    timeStarted,
    timeFinished,
  }: {
    name: string;
    category: string;
    timeStarted: Date;
    timeFinished: Date;
  } = taskData;
  const { userId } = decodedToken;
  try {
    const user = await User.findById(userId);
    if (!user) {
      //   ToDo - Throw error
      return;
    }
    console.log(timeStarted > timeFinished);
    if (timeStarted > timeFinished) {
      //   ToDo - Throw error
      return;
    }
    const newTask = new Task({
      name: name,
      category: category,
      timeStarted: timeStarted,
      timeFinished: timeFinished,
      user: user._id.toString(),
    });
    const resultTask = await newTask.save();
    user.tasks.push(resultTask._id);
    await user.save();
    return res.status(201).json(newTask);
  } catch (error) {
    return res.status(500).json({
      message: 'Something went wrong',
    });
  }
};

export const deleteTask = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const taskId = req.params.id;
  console.log(taskId);
  // get task
  try {
    const task = await Task.findById(taskId);
    console.log(task);
    if (!task) {
      return;
    }
    // check user
    const { decodedToken } = req.body;
    const { userId } = decodedToken;
    console.log(userId);
    const isEqual = userId.toString() === task.user.toString();
    if (!isEqual) {
      return;
    }
    const deleteResult = await task.remove();
    return res.status(202).json(deleteResult);
  } catch (error) {
    return;
  }
};
