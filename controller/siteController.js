import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Account from '../model/Account.js';

import mailController from './mailController.js';
export async function test(req, res) {
  const data = await mailController('duylamtv.2000@outlook.com.vn', 'Test 1', 'Noi Dung');
  res.json({
    message: 'Success',
    data
  });
}

export async function login(req, res) {
  const { userName, password } = req.body;
  const acc = await Account.findOne({ userName });
  if (!acc) throw new Error(`User ${userName} not found`);
  if (!bcrypt.compareSync(password, acc.password)) throw new Error('Incorrect password');
  const token = jwt.sign({ _id: acc._id }, process.env.SECRET);
  res.cookie('jwt', token, {
    maxAge: 24 * 60 * 60 * 1000 // 1 day
  });

  res.json({
    message: 'Success'
  });
}

export async function logout(req, res) {
  res.cookie('jwt', '', { maxAge: 0 });
  res.json({
    message: 'Success'
  });
}
