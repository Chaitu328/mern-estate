import express from 'express';
import { deleteUserController, getUserListings, testController, updateUserController,getUser } from '../controller/user.controller.js';
import { verifyUserToken } from '../Utils/verifyUser.js';
const router = express.Router();

router.get('/test',testController);
router.post('/update/:id',verifyUserToken,updateUserController)
router.delete('/delete/:id',verifyUserToken,deleteUserController)
router.get('/listing/:id',verifyUserToken,getUserListings)
router.get('/:id',verifyUserToken,getUser)

export default router;