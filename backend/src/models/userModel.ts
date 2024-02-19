//library imports
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
//custom imports

export interface UserInterface {
  _id?: string;
  name: string;
  email: string;
  password: string;
  workouts?: string[];
  isAdmin: boolean;
  role: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, default: '' },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    workouts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Workout', default: [] }],
    isAdmin: { type: Boolean, required: true, default: false },
    role: {
      type: String,
      required: true,
      default: 'user',
      enum: ['user', 'manager', 'employee', 'admin'],
    },
  },
  { timestamps: true }
);

//encrypt password before saving
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  }
  this.password = await bcrypt.hash(this.password, 12);
});
const User = mongoose.model('User', userSchema);

export default User;
