import express from 'express';
import { testController, updateUserController } from '../controller/user.controller.js';
import { verifyUserToken } from '../Utils/verifyUser.js';
const router = express.Router();

router.get('/test',testController);
router.post('/update/:id',verifyUserToken,updateUserController)

export default router;