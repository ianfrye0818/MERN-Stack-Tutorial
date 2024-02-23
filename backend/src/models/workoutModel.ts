//library imports
import mongoose, { ObjectId } from 'mongoose';
import { UserInterface } from './userModel';
//custom imports
export type WorkoutInterface = {
  title: string;
  description?: string;
  reps?: number;
  sets?: number;
  weight?: number;
  rest?: number;
  date: Date;
  user: ObjectId;
  createdAt?: Date;
  updatedAt?: Date;
};

const workoutSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    reps: { type: Number },
    sets: { type: Number },
    weight: { type: Number },
    rest: { type: Number },
    date: { type: Date, required: true, default: Date.now() },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  },
  { timestamps: true }
);

const Workout = mongoose.model('Workout', workoutSchema);

export default Workout;
