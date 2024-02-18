import mongoose from 'mongoose';

const workoutSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String },
    reps: { type: Number },
    sets: { type: Number },
    rest: { type: Number },
    date: { type: Date, required: true, default: Date.now() },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  },
  { timestamps: true }
);

const Workout = mongoose.model('Workout', workoutSchema);

export default Workout;
