import express from 'express';
import {
  deleteAll,
  deleteOption,
  getAll,
  getOption,
  setOption
} from '../controller/optionController.js';
import { catchErrors } from '../handlers/errorHandlers.js';
const router = express.Router();

router.post('/setOption', catchErrors(setOption));
router.get('/getOption', catchErrors(getOption));
router.get('/getAll', catchErrors(getAll));
router.post('/deleteOption', catchErrors(deleteOption));
router.post('/deleteAll', catchErrors(deleteAll));

export default router;
