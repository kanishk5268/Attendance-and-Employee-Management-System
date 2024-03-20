import {Router} from 'express';
import logIn from './../controllers/logIn.controller.js';


const userRouter = Router();

userRouter.route("/login").post(logIn);

export default userRouter;