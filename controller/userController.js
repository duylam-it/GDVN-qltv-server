import Account from '../model/Account.js';
import User from '../model/User.js';
import { random } from '../utils/random.js';

export async function create(req, res) {
  const { userName, ...data } = req.body;
  const acc = await Account.findOne({ userName });
  if (!acc) throw new Error(`Account ${userName} not found`);
  let user = await User.findOne({ userName });
  if (user) throw new Error(`User ${userName} already exists`);
  user = await new User({
    userName,
    otp: random(999999),
    ...data
  }).save();

  res.json({
    message: 'Success',
    data: user
  });
}

export async function readOne(req, res) {
  const { userName } = req.body;
  const user = await User.findOne({ userName });
  if (!user) throw new Error(`User ${userName} not found`);

  res.json({
    message: 'Success',
    data: user
  });
}

export async function readAll(req, res) {
  const data = await User.find();

  res.json({
    message: 'Success',
    data
  });
}

export async function update(req, res) {
  const { userName, ...data } = req.body;
  const user = await User.findOneAndUpdate({ userName }, { ...data }, { new: true });
  if (!user) throw new Error(`User ${userName} not found`);

  res.json({
    message: 'Success',
    data: user
  });
}

export async function deleteOne(req, res) {
  const { userName } = req.body;
  const user = await User.findOneAndDelete({ userName });
  if (!user) throw new Error(`User ${userName} not found`);

  res.json({
    message: 'Success'
  });
}

export async function deleteAll(req, res) {
  await User.deleteMany({});

  res.json({
    message: 'Success'
  });
}

export async function verification(req, res) {
  const { userName, otp } = req.body;
  const user = await User.findOne({ userName });
  if (!user) throw new Error(`User ${userName} not found`);
  if (user.otp !== otp) throw new Error('Wrong otp');
  user.verified = true;
  await user.save();

  res.json({
    message: 'Success'
  });
}
