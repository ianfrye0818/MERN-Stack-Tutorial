//library imports
import mongoose from 'mongoose';
//custom imports
export interface WorkoutInterface {
  title: string;
  description?: string;
  reps?: number;
  sets?: number;
  weight?: number;
  rest?: number;
  date: Date;
  user?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const workoutSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    reps: { type: Number, required: true },
    sets: { type: Number },
    weight: { type: Number },
    rest: { type: Number },
    date: { type: Date, required: true, default: Date.now() },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  },
  { timestamps: true }
);

const Workout = mongoose.model('Workout', workoutSchema);

export default Workout;
