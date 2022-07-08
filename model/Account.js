import mongoose from 'mongoose';

export default mongoose.model(
  'Account',
  new mongoose.Schema(
    {
      userName: { type: 'String', required: 'userName is required' },
      password: { type: 'String', required: 'pass is required' },
      permissions: { type: 'String', required: 'permissions is required' }
    },
    { timestamps: true }
  )
);
