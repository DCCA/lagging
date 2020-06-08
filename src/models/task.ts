import mongoose from 'mongoose';

const Schema = mongoose.Schema;

interface ITask extends mongoose.Document {
  name: string;
  category: string;
  timeStarted: Date;
  timeFinished?: Date;
  user: string;
}

const taskSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    default: 'none',
  },
  timeStarted: {
    type: Date,
    required: true,
  },
  timeFinished: {
    type: Date,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
});

export default mongoose.model<ITask>('Task', taskSchema);
