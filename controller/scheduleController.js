import User from '../model/User.js';

export function cleanUser() {
  User.deleteMany({ verified: false });
}
