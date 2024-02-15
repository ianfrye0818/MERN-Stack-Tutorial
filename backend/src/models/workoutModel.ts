import mongoose from 'mongoose';

const workoutSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    sets: { type: Number, required: true },
    reps: { type: Number, required: true },
    rest: { type: Number, required: true },
    date: { type: Date, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  },
  { timestamps: true }
);

const Workout = mongoose.model('Workout', workoutSchema);

export default Workout;
