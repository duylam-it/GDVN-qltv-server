import express from 'express';
import {
  create,
  deleteAll,
  deleteOne,
  readAll,
  updatePassword,
  updatePermissions
} from '../controller/accountController.js';
import { catchErrors } from '../handlers/errorHandlers.js';
const router = express.Router();

router.post('/create', catchErrors(create));
router.get('/readAll', catchErrors(readAll));
router.post('/updatePassword', catchErrors(updatePassword));
router.post('/updatePermissions', catchErrors(updatePermissions));
router.post('/deleteOne', catchErrors(deleteOne));
router.post('/deleteAll', catchErrors(deleteAll));

export default router;
