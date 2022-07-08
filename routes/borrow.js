import express from 'express';
import {
  create,
  deleteAll,
  deleteOne,
  readAll,
  readOne,
  update
} from '../controller/borrowController.js';
import { catchErrors } from '../handlers/errorHandlers.js';
const router = express.Router();

router.post('/create', catchErrors(create));
router.get('/readOne', catchErrors(readOne));
router.get('/readAll', catchErrors(readAll));
router.post('/update', catchErrors(update));
router.post('/deleteOne', catchErrors(deleteOne));
router.post('/deleteAll', catchErrors(deleteAll));

export default router;
