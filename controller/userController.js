import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../model/User.js';
import { random } from '../utils/random.js';
import mailController from './mailController.js';

const encodedToken = (sub, exp, secret) => {
  return jwt.sign(
    {
      iss: 'Duy Lam',
      iat: new Date().getTime(),
      exp,
      sub
    },
    secret
  );
};

export async function sendOTP(req, res) {
  // eslint-disable-next-line no-unused-vars
  const { _id } = await req.user.toJSON();
  const user = await User.findById(_id);
  const otp = random(999999);
  user.otp = otp;
  await user.save();
  await mailController(user.email, 'OTP', `Mã xác thực OTP của bạn là: ${otp}`);

  res.json({
    success: true,
    data: otp
  });
}

export async function signUp(req, res) {
  const { email, password, ...data } = req.body;
  let user = await User.findOne({ email });
  if (user) throw new Error('email is not available');
  const salt = await bcrypt.genSalt(10);
  const hashedPass = await bcrypt.hash(password, salt);
  user = await new User({
    email,
    password: hashedPass,
    otp: random(999999),
    ...data
  }).save();
  // eslint-disable-next-line no-unused-vars
  const { password: _password, ...dataNoPasswords } = user.toJSON();

  res.json({
    success: true,
    data: dataNoPasswords
  });
}

export async function signIn(req, res) {
  // eslint-disable-next-line no-unused-vars
  const { _id: id, password, ...data } = await req.user.toJSON();
  const accessToken = encodedToken(
    id,
    new Date().setHours(new Date().getHours() + 1),
    process.env.ACCESS_TOKEN_SECRET
  );
  const refreshToken = encodedToken(
    id,
    new Date().setDate(new Date().getDate() + 3),
    process.env.REFRESH_TOKEN_SECRET
  );

  res.json({
    success: true,
    data: {
      accessToken,
      refreshToken,
      user: data
    }
  });
}

export async function verify(req, res) {
  // eslint-disable-next-line no-unused-vars
  const { password, ...data } = await req.user.toJSON();

  res.json({
    success: true,
    data
  });
}

export async function refreshToken(req, res) {
  // eslint-disable-next-line no-unused-vars
  const { _id: id, password, ...data } = await req.user.toJSON();
  const accessToken = encodedToken(
    id,
    new Date().setHours(new Date().getHours() + 1),
    process.env.ACCESS_TOKEN_SECRET
  );

  res.json({
    success: true,
    data: {
      accessToken,
      user: data
    }
  });
}

export async function authGoogle(req, res) {
  res.json({
    success: true,
    data: req.user
  });
}

export async function readOne(req, res) {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) throw new Error(`User ${email} not found`);

  res.json({
    success: true,
    data: user
  });
}

export async function readAll(req, res) {
  const data = await User.find();

  res.json({
    success: true,
    data
  });
}

export async function update(req, res) {
  const { email, oldPassword, newPassword, ...data } = req.body;
  const user = await User.findOneAndUpdate({ email }, { ...data }, { new: true });
  if (!user) throw new Error(`User ${email} not found`);
  if (oldPassword !== undefined && newPassword !== undefined) {
    if (!bcrypt.compareSync(oldPassword, user.password)) throw new Error('Incorrect password');
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPassword, salt);
    await user.save();
  }
  // eslint-disable-next-line no-unused-vars
  const { password: _password, ...dataNoPasswords } = user.toJSON();

  res.json({
    success: true,
    data: dataNoPasswords
  });
}

export async function deleteOne(req, res) {
  const { email } = req.body;
  const user = await User.findOneAndDelete({ email });
  if (!user) throw new Error(`User ${email} not found`);

  res.json({
    success: true
  });
}

export async function deleteAll(req, res) {
  await User.deleteMany({});

  res.json({
    success: true
  });
}

export async function verification(req, res) {
  const { email, otp } = req.body;
  const user = await User.findOne({ email });
  if (!user) throw new Error(`User ${email} not found`);
  if (user.otp !== otp) throw new Error('Wrong otp');
  user.verified = true;
  await user.save();

  res.json({
    success: true
  });
}
