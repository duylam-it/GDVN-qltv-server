import Category from '../model/Category.js';

export async function create(req, res) {
  const { name, description } = req.body;
  let category = await Category.findOne({ name });
  if (category) throw new Error(`Category ${name} already exists`);
  category = await new Category({
    name,
    description
  }).save();

  res.json({
    message: 'Success',
    data: category
  });
}

export async function readOne(req, res) {
  const { name } = req.body;
  const category = await Category.findOne({ name });
  if (!category) throw new Error(`Category ${name} not found`);

  res.json({
    message: 'Success',
    data: category
  });
}

export async function readAll(req, res) {
  const data = await Category.find();

  res.json({
    message: 'Success',
    data
  });
}

export async function update(req, res) {
  const { name, ...data } = req.body;
  const category = await Category.findOneAndUpdate({ name }, { ...data }, { new: true });
  if (!category) throw new Error(`Category ${name} not found`);

  res.json({
    message: 'Success',
    data: category
  });
}

export async function deleteOne(req, res) {
  const { name } = req.body;
  const category = await Category.findOneAndDelete({ name });
  if (!category) throw new Error(`Category ${name} not found`);

  res.json({
    message: 'Success'
  });
}

export async function deleteAll(req, res) {
  await Category.deleteMany({});

  res.json({
    message: 'Success'
  });
}
