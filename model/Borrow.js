import mongoose from 'mongoose';

export default mongoose.model(
  'Borrow',
  new mongoose.Schema(
    {
      from: { type: 'Date', required: 'from is required' },
      to: { type: 'Date', required: 'to is required' },
      description: { type: 'String' },
      book: { type: mongoose.Schema.Types.ObjectId, required: 'book is required', ref: 'Book' },
      user: { type: mongoose.Schema.Types.ObjectId, required: 'user is required', ref: 'User' }
    },
    { timestamps: true }
  )
);
