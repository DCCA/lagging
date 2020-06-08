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
};
