import express from 'express';
import { login, logout, test } from '../controller/siteController.js';
import { catchErrors } from '../handlers/errorHandlers.js';
const router = express.Router();

router.post('/test', catchErrors(test));
router.post('/login', catchErrors(login));
router.post('/logout', catchErrors(logout));

export default router;
