import express from "express";
import { signupController,signinController, googleController,signOutController } from "../controller/auth.controller.js";

const router = express.Router();

router.post('/signup',signupController)
router.post('/signin',signinController)
router.post('/google',googleController)
router.get('/signout',signOutController)

export default router;