import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, minlength: 6 },
    workouts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Workout' }],
  },
  { timestamps: true }
);

const User = mongoose.model('User', userSchema);

export default User;
