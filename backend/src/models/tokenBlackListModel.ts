//library imports
import mongoose from 'mongoose';

export type TokenBlackListInterface = {
  token: string;
  revoked_at: Date;
};

//token blacklist schema
const tokenBlackListSchema = new mongoose.Schema(
  {
    token: { type: String, required: true },
    revoked_at: { type: Date, required: true, default: Date.now },
  },
  { timestamps: true }
);

const TokenBlackList = mongoose.model('TokenBlackList', tokenBlackListSchema);

export default TokenBlackList;
