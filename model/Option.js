import mongoose from 'mongoose';

export default mongoose.model(
  'Option',
  new mongoose.Schema(
    {
      key: { type: 'String', required: 'key is required' },
      value: { type: 'String', required: 'value is required' }
    },
    { timestamps: true }
  )
);
