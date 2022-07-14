import mongoose from 'mongoose';

export default mongoose.model(
  'User',
  new mongoose.Schema(
    {
      fullName: { type: 'String', required: 'fullName is required' },
      birthday: { type: 'String', required: 'birthday is required' },
      gender: { type: 'String', required: 'gender is required' },
      email: { type: 'String', required: 'email is required' },
      phone: { type: 'String', required: 'phone is required' },
      address: { type: 'String' },
      userName: { type: 'String', required: 'userName is required' },
      password: { type: 'String', required: 'pass is required' },
      permissions: { type: 'String', required: 'permissions is required' },
      verified: { type: 'Boolean', default: false },
      otp: { type: 'String' }
    },
    { timestamps: true }
  )
);
