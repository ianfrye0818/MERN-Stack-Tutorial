import mongoose from 'mongoose';

const tokenBlackListSchema = new mongoose.Schema(
  {
    token: { type: String, required: true },
    revoked_at: { type: Date, required: true, default: Date.now },
  },
  { timestamps: true }
);

const TokenBlackList = mongoose.model('TokenBlackList', tokenBlackListSchema);

export default TokenBlackList;
