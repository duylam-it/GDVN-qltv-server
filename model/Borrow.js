import mongoose from 'mongoose';

export default mongoose.model(
  'Borrow',
  new mongoose.Schema(
    {
      from: { type: 'String', required: 'from is required' },
      to: { type: 'String', required: 'to is required' },
      status: { type: 'String', required: 'status is required' },
      book: { type: 'String', required: 'book is required', ref: 'Book' },
      user: { type: 'String', required: 'user is required', ref: 'User' }
    },
    { timestamps: true }
  )
);
