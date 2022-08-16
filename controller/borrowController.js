import Book from '../model/Book.js';
import Borrow from '../model/Borrow.js';
import User from '../model/User.js';

export async function create(req, res) {
  const { bookID, userID, ...data } = req.body;
  const book = await Book.findById(bookID);
  if (!book) throw new Error(`Book ${bookID} not found`);
  const user = await User.findById(userID);
  if (!user) throw new Error(`User ${userID} not found`);
  const borrow = await new Borrow({
    book: bookID,
    user: userID,
    ...data
  }).save();

  res.json({
    success: true,
    data: borrow
  });
}

export async function readOne(req, res) {
  const { _id } = req.body;
  const borrow = await Borrow.findOne({ _id });
  if (!borrow) throw new Error(`Borrow ${_id} not found`);

  res.json({
    success: true,
    data: borrow
  });
}

export async function readAll(req, res) {
  const data = await Borrow.find().populate('book').populate('user');

  res.json({
    success: true,
    data
  });
}

export async function update(req, res) {
  const { _id, bookID, userID, ...data } = req.body;
  let borrow = await Borrow.findOneAndUpdate({ _id }, { ...data }, { new: true });
  if (!borrow) throw new Error(`Borrow ${_id} not found`);
  if (bookID !== undefined) {
    const book = await Book.findById(bookID);
    if (!book) throw new Error(`Book ${bookID} not found`);
    else borrow.book = bookID;
  }
  if (userID !== undefined) {
    const user = await User.findById(userID);
    if (!user) throw new Error(`User ${userID} not found`);
    else borrow.user = userID;
  }

  borrow = await borrow.save();

  res.json({
    success: true,
    data: borrow
  });
}

export async function deleteOne(req, res) {
  const { _id } = req.body;
  const borrow = await Borrow.findOneAndDelete({ _id });
  if (!borrow) throw new Error(`Borrow ${_id} not found`);

  res.json({
    success: true
  });
}

export async function deleteAll(req, res) {
  await Borrow.deleteMany({});

  res.json({
    success: true
  });
}
