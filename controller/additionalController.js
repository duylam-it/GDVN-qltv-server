import Additional from '../model/Additional.js';

export async function create(req, res) {
  const { name, description } = req.body;
  let additional = await Additional.findOne({ name });
  if (additional) throw new Error(`Additional ${name} already exists`);
  additional = await new Additional({
    name,
    description
  }).save();

  res.json({
    message: 'Success',
    data: additional
  });
}

export async function readOne(req, res) {
  const { name } = req.body;
  const additional = await Additional.findOne({ name });
  if (!additional) throw new Error(`Additional ${name} not found`);

  res.json({
    message: 'Success',
    data: additional
  });
}

export async function readAll(req, res) {
  const data = await Additional.find();

  res.json({
    message: 'Success',
    data
  });
}

export async function update(req, res) {
  const { name, ...data } = req.body;
  const additional = await Additional.findOneAndUpdate({ name }, { ...data }, { new: true });
  if (!additional) throw new Error(`Additional ${name} not found`);

  res.json({
    message: 'Success',
    data: additional
  });
}

export async function deleteOne(req, res) {
  const { name } = req.body;
  const additional = await Additional.findOneAndDelete({ name });
  if (!additional) throw new Error(`Additional ${name} not found`);

  res.json({
    message: 'Success'
  });
}

export async function deleteAll(req, res) {
  await Additional.deleteMany({});

  res.json({
    message: 'Success'
  });
}
