import Book from '../model/Book.js';
import Borrow from '../model/Borrow.js';
import User from '../model/User.js';

export async function create(req, res) {
  const { bookCode, userName, ...data } = req.body;
  const book = await Book.findOne({ code: bookCode });
  if (!book) throw new Error(`Book ${bookCode} not found`);
  const user = await User.findOne({ userName });
  if (!user) throw new Error(`User ${userName} not found`);
  const borrow = await new Borrow({
    book: bookCode,
    user: userName,
    ...data
  }).save();

  res.json({
    message: 'Success',
    data: borrow
  });
}

export async function readOne(req, res) {
  const { _id } = req.body;
  const borrow = await Borrow.findOne({ _id });
  if (!borrow) throw new Error(`Borrow ${_id} not found`);

  res.json({
    message: 'Success',
    data: borrow
  });
}

export async function readAll(req, res) {
  const data = await Borrow.find();

  res.json({
    message: 'Success',
    data
  });
}

export async function update(req, res) {
  const { _id, bookCode, userName, ...data } = req.body;
  let borrow = await Borrow.findOneAndUpdate({ _id }, { ...data }, { new: true });
  if (!borrow) throw new Error(`Borrow ${_id} not found`);
  if (bookCode !== undefined) {
    const book = await Book.findOne({ code: bookCode });
    if (!book) throw new Error(`Book ${bookCode} not found`);
    else borrow.book = bookCode;
  }
  if (userName !== undefined) {
    const user = await User.findOne({ userName });
    if (!user) throw new Error(`User ${userName} not found`);
    else borrow.user = userName;
  }

  borrow = await borrow.save();

  res.json({
    message: 'Success',
    data: borrow
  });
}

export async function deleteOne(req, res) {
  const { _id } = req.body;
  const borrow = await Borrow.findOneAndDelete({ _id });
  if (!borrow) throw new Error(`Borrow ${_id} not found`);

  res.json({
    message: 'Success'
  });
}

export async function deleteAll(req, res) {
  await Borrow.deleteMany({});

  res.json({
    message: 'Success'
  });
}
