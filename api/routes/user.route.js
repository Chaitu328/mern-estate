import express from 'express';
import { testController } from '../controller/user.controller.js';
const router = express.Router();

router.get('/test',testController);

export default router;