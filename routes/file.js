import express from 'express';
import multer from 'multer';
import { getFiles, test, uploadBookImages } from '../controller/fileController.js';
import { catchErrors } from '../handlers/errorHandlers.js';
const router = express.Router();

// SET STORAGE
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/uploads');
  },
  filename: function (req, file, cb) {
    const extArray = file.mimetype.split('/');
    const extension = extArray[extArray.length - 1];
    cb(null, file.fieldname + '-' + Date.now() + '.' + extension);
  }
});

const upload = multer({ storage: storage });

router.post('/upload/bookImages', upload.array('book', 12), catchErrors(uploadBookImages));
router.post('/getFiles', catchErrors(getFiles));
router.get('/test', catchErrors(test));

export default router;
