import express from 'express';
import {
  authGoogle,
  deleteAll,
  deleteOne,
  readAll,
  readOne,
  refreshToken,
  sendOTP,
  signIn,
  signUp,
  update,
  verify
} from '../controller/userController.js';
import { catchErrors } from '../handlers/errorHandlers.js';
import passport from '../middlewares/passport.js';

const router = express.Router();

router.post('/sendOTP', passport.authenticate('jwt', { session: false }), catchErrors(sendOTP));
router.post('/signUp', catchErrors(signUp));
router.post('/signIn', passport.authenticate('local', { session: false }), catchErrors(signIn));
router.post('/verify', passport.authenticate('jwt', { session: false }), catchErrors(verify));
router.post(
  '/refreshToken',
  passport.authenticate('jwtRefresh', { session: false }),
  catchErrors(refreshToken)
);
router.post(
  '/auth/google',
  passport.authenticate('google-plus-token', { session: false }),
  catchErrors(authGoogle)
);
router.get('/readOne', catchErrors(readOne));
router.get('/readAll', catchErrors(readAll));
router.post('/update', catchErrors(update));
router.post('/deleteOne', catchErrors(deleteOne));
router.post('/deleteAll', catchErrors(deleteAll));

export default router;
