import express from 'express';
import userAuth from '../middleware/userAuth.js';
import { getUserData } from '../Controllers/userController.js';
import { sendVerifyOtp } from '../Controllers/authController.js';


const userRouter = express.Router();

userRouter.get('/data', userAuth, getUserData);

userRouter.post('/send-verify-otp', userAuth, sendVerifyOtp)

export default userRouter;