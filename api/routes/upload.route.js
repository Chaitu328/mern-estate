import express from 'express';
import  {upload}  from '../middleware/uploadMiddleware.js';
import {uploadFile} from '../controller/upload.controller.js';

const router = express.Router();
// router.post('/upload', upload.single('avatar'), uploadController.uploadFile);

router.post('/upload', upload.single('avatar'), uploadFile);

export default router;