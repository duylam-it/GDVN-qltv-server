/* eslint-disable no-unused-vars */
import bcrypt from 'bcryptjs';
import Account from '../model/Account.js';

export async function create(req, res) {
  const { userName, password, permissions } = req.body;
  let acc = await Account.findOne({ userName });
  if (acc) throw new Error('userName is not available');
  const salt = await bcrypt.genSalt(10);
  const hashedPass = await bcrypt.hash(password, salt);
  acc = new Account({
    userName,
    password: hashedPass,
    permissions
  });
  const result = await acc.save();
  const { password: _password, ...data } = result.toJSON();

  res.json({
    message: 'Success',
    data
  });
}

export async function readAll(req, res) {
  const data = await Account.find();

  res.json({
    message: 'Success',
    data
  });
}

export async function updatePassword(req, res) {
  const { userName, oldPassword, newPassword } = req.body;
  const acc = await Account.findOne({ userName });
  if (!acc) throw new Error(`Account ${userName} not found`);
  if (!bcrypt.compareSync(oldPassword, acc.password)) throw new Error('Incorrect password');
  const salt = await bcrypt.genSalt(10);
  acc.password = await bcrypt.hash(newPassword, salt);
  const result = await acc.save();
  const { password: _password, ...data } = result.toJSON();

  res.json({
    message: 'Success',
    data
  });
}

export async function updatePermissions(req, res) {
  const { userName, permissions } = req.body;
  const acc = await Account.findOne({ userName });
  if (!acc) throw new Error(`Account ${userName} not found`);
  acc.permissions = permissions;
  const result = await acc.save();
  const { password: _password, ...data } = result.toJSON();

  res.json({
    message: 'Success',
    data
  });
}

export async function deleteOne(req, res) {
  const { userName } = req.body;
  const acc = await Account.findOneAndDelete({ userName });
  if (!acc) throw new Error(`Account ${userName} not found`);

  res.json({
    message: 'Success'
  });
}

export async function deleteAll(req, res) {
  await Account.deleteMany({});

  res.json({
    message: 'Success'
  });
}
