import Topic from '../model/Topic.js';

export async function create(req, res) {
  const { name, description } = req.body;
  let topic = await Topic.findOne({ name });
  if (topic) throw new Error(`Topic ${name} already exists`);
  topic = await new Topic({
    name,
    description
  }).save();

  res.json({
    message: 'Success',
    data: topic
  });
}

export async function readOne(req, res) {
  const { name } = req.body;
  const topic = await Topic.findOne({ name });
  if (!topic) throw new Error(`Topic ${name} not found`);

  res.json({
    message: 'Success',
    data: topic
  });
}

export async function readAll(req, res) {
  const data = await Topic.find();

  res.json({
    message: 'Success',
    data
  });
}

export async function update(req, res) {
  const { name, ...data } = req.body;
  const topic = await Topic.findOneAndUpdate({ name }, { ...data }, { new: true });
  if (!topic) throw new Error(`Topic ${name} not found`);

  res.json({
    message: 'Success',
    data: topic
  });
}

export async function deleteOne(req, res) {
  const { name } = req.body;
  const topic = await Topic.findOneAndDelete({ name });
  if (!topic) throw new Error(`Topic ${name} not found`);

  res.json({
    message: 'Success'
  });
}

export async function deleteAll(req, res) {
  await Topic.deleteMany({});

  res.json({
    message: 'Success'
  });
}
