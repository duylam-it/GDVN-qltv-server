import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Account from '../model/Account.js';
import User from '../model/User.js';

import mailController from './mailController.js';
export async function test(req, res) {
  const data = await mailController('duylamtv.2000@outlook.com.vn', 'Test', 'Noi Dung');
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
  const accessToken = jwt.sign({ _id: acc._id }, process.env.ACCESS_TOKEN_SECRET);
  const refreshToken = jwt.sign({ _id: acc._id }, process.env.REFRESH_TOKEN_SECRET);

  res.json({
    message: 'Success',
    data: {
      accessToken,
      refreshToken
    }
  });
}

export async function logout(req, res) {
  res.json({
    message: 'Success'
  });
}

export async function refreshToken(req, res) {
  let { refreshToken } = req.body;
  const payload = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
  const acc = await Account.findOne({ _id: payload._id });
  if (!acc) throw new Error(`Account ${payload._id} does not exist`);
  const accessToken = jwt.sign({ _id: acc._id }, process.env.ACCESS_TOKEN_SECRET);
  // refreshToken = jwt.sign({ _id: acc._id }, process.env.REFRESH_TOKEN_SECRET);

  res.json({
    message: 'Success',
    data: {
      accessToken
      // refreshToken
    }
  });
}

export async function getCurrentUser(req, res) {
  const token = req.headers.authorization.split(' ')[1];
  const payload = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
  const acc = await Account.findOne({ _id: payload._id });
  if (!acc) throw new Error(`Account ${payload._id} does not exist`);
  const user = await User.findOne({ userName: acc.userName });
  if (!user) throw new Error(`User ${acc.userName} does not exist`);

  res.json({
    message: 'Success',
    data: user
  });
}
