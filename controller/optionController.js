import Option from '../model/Option.js';

export async function setOption(req, res) {
  const { key, value } = req.body;
  let option = await Option.findOneAndUpdate({ key }, { value }, { new: true });
  if (!option) {
    option = new Option({
      key,
      value
    });
    await option.save();
  }

  res.json({
    message: 'Success',
    data: option
  });
}

export async function getOption(req, res) {
  const { key } = req.body;
  const option = await Option.findOne({ key });
  if (!option) throw new Error('No option found');

  res.json({
    message: 'Success',
    data: option
  });
}

export async function getAll(req, res) {
  const data = await Option.find();

  res.json({
    message: 'Success',
    data
  });
}

export async function deleteOption(req, res) {
  const { key } = req.body;
  const option = await Option.findOneAndDelete({ key });
  if (!option) throw new Error('No option found');

  res.json({
    message: 'Success'
  });
}

export async function deleteAll(req, res) {
  await Option.deleteMany({});

  res.json({
    message: 'Success'
  });
}
