import Account from '../model/Account.js';
import User from '../model/User.js';

export async function cleanAccount() {
  const users = await User.find({}, 'userName');
  await User.deleteMany({ verified: false });
  users.forEach(async (user) => {
    await Account.deleteOne({ userName: user.userName });
  });
}
