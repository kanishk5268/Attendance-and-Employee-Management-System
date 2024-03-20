import { Router } from "express";
import checkAccess from "./../middlewares/checkAccess.middleware.js";
// import upload from './../middlewares/multer.middleware';
import { addUser,logInUser } from "../controllers/admin.controllers.js";
import verifyJwt from "./../middlewares/jwtVerification.middleware.js";

const adminRouter = Router();

adminRouter.route("/registerUser").post(verifyJwt, addUser);
adminRouter.route("/login").post(logInUser);

export default adminRouter;
