import express from 'express';
import { deleteUserController, testController, updateUserController } from '../controller/user.controller.js';
import { verifyUserToken } from '../Utils/verifyUser.js';
const router = express.Router();

router.get('/test',testController);
router.post('/update/:id',verifyUserToken,updateUserController)
router.delete('/delete/:id',verifyUserToken,deleteUserController)

export default router;