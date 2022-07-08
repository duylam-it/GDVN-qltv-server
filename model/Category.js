import mongoose from 'mongoose';

export default mongoose.model(
  'Category',
  new mongoose.Schema(
    {
      name: { type: 'String', required: 'name is required' },
      description: { type: 'String', required: 'description is required' }
    },
    { timestamps: true }
  )
);
