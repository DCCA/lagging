import mongoose from 'mongoose';

const Schema = mongoose.Schema;

interface IUser extends mongoose.Document {
  name: string;
  email: string;
  password: string;
  hourlyRate: number;
  tasks: string[];
}

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  hourlyRate: {
    type: Number,
    required: true,
  },
  tasks: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Task',
    },
  ],
});

export default mongoose.model<IUser>('User', userSchema);
