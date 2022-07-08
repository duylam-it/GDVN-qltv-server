import Book from '../model/Book.js';
import Category from '../model/Category.js';
import Topic from '../model/Topic.js';

export async function create(req, res) {
  const { code, topicName, categoryName, ...data } = req.body;
  let book = await Book.findOne({ code });
  if (book) throw new Error(`Book ${code} already exists`);
  const topic = await Topic.findOne({ name: topicName });
  if (!topic) throw new Error(`Topic ${topicName} not found`);
  const category = await Category.findOne({ name: categoryName });
  if (!category) throw new Error(`Category ${categoryName} not found`);

  book = await new Book({
    code,
    topic: topicName,
    category: categoryName,
    ...data
  }).save();

  res.json({
    message: 'Success',
    data: book
  });
}

export async function readOne(req, res) {
  const { code } = req.body;
  const book = await Book.findOne({ code });
  if (!book) throw new Error(`Book ${code} not found`);

  res.json({
    message: 'Success',
    data: book
  });
}

export async function readAll(req, res) {
  const data = await Book.find();

  res.json({
    message: 'Success',
    data
  });
}

export async function update(req, res) {
  const { code, topicName, categoryName, ...data } = req.body;
  let book = await Book.findOneAndUpdate({ code }, { ...data }, { new: true });
  if (!book) throw new Error(`Book ${code} not found`);
  if (topicName !== undefined) {
    const topic = await Topic.findOne({ name: topicName });
    if (!topic) throw new Error(`Topic ${topicName} not found`);
    else book.topic = topicName;
  }
  if (categoryName !== undefined) {
    const category = await Category.findOne({ name: categoryName });
    if (!category) throw new Error(`Category ${categoryName} not found`);
    else book.category = categoryName;
  }

  book = await book.save();

  res.json({
    message: 'Success',
    data: book
  });
}

export async function deleteOne(req, res) {
  const { code } = req.body;
  const book = await Book.findOneAndDelete({ code });
  if (!book) throw new Error(`Book ${code} not found`);

  res.json({
    message: 'Success'
  });
}

export async function deleteAll(req, res) {
  await Book.deleteMany({});

  res.json({
    message: 'Success'
  });
}
