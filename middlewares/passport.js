import bcrypt from 'bcryptjs';
import 'dotenv/config';
import passport from 'passport';
import GooglePlusTokenStrategy from 'passport-google-plus-token';
import { ExtractJwt, Strategy as JwtStrategy } from 'passport-jwt';
import { Strategy as LocalStrategy } from 'passport-local';
import User from '../model/User.js';

passport.use(
  'jwt',
  new JwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken('Authorization'),
      secretOrKey: process.env.ACCESS_TOKEN_SECRET
    },
    async (payload, done) => {
      const user = await User.findById(payload.sub);
      if (!user) return done(null, false);
      else return done(null, user);
    }
  )
);

passport.use(
  'jwtRefresh',
  new JwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken('Authorization'),
      secretOrKey: process.env.REFRESH_TOKEN_SECRET
    },
    async (payload, done) => {
      const user = await User.findById(payload.sub);
      if (!user) return done(null, false);
      else return done(null, user);
    }
  )
);

passport.use(
  'local',
  new LocalStrategy({ usernameField: 'email' }, async (email, password, done) => {
    const user = await User.findOne({ email });
    if (!user) return done(null, false, { message: `User ${email} not found` });
    if (bcrypt.compareSync(password, user.password)) {
      return done(null, user);
    } else {
      return done(null, false, { message: 'Incorrect password' });
    }
  })
);

passport.use(
  'google-plus-token',
  new GooglePlusTokenStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET
    },
    (accessToken, refreshToken, profile, done) => {
      console.log('accessToken ' + accessToken);
      console.log('refreshToken ' + refreshToken);
      console.log('profile ' + profile);
      return done(null, profile);
    }
  )
);

export default passport;
