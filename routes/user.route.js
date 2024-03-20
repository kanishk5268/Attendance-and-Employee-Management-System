import {Router} from 'express';
import logIn from './../controllers/logIn.controller.js';
import logOut from './../controllers/user.controller.js';
import verifyJwt from '../middlewares/jwtVerification.middleware.js';

const userRouter = Router();

userRouter.route("/login").post(logIn);
userRouter.route("/logout").post(verifyJwt, logOut);

export default userRouter;