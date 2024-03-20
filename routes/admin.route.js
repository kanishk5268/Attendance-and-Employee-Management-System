import { Router } from "express";
// import upload from './../middlewares/multer.middleware';
import { addUser,logOutAdmin } from "../controllers/admin.controllers.js";
import logIn from './../controllers/logIn.controller.js';
import verifyJwt from "./../middlewares/jwtVerification.middleware.js";

const adminRouter = Router();

adminRouter.route("/registerUser").post(verifyJwt, addUser);
adminRouter.route("/login").post(logIn);
adminRouter.route("/logout").post(verifyJwt,logOutAdmin)

export default adminRouter;
