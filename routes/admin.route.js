import { Router } from "express";
// import upload from './../middlewares/multer.middleware';
import {
  addUser,
  logOutAdmin,
  updateUserDetails,
  deleteUser,
  approveLeave,
  rejectLeave
} from "../controllers/admin.controllers.js";
import logIn from "./../controllers/logIn.controller.js";
import verifyJwt from "./../middlewares/jwtVerification.middleware.js";

const adminRouter = Router();

adminRouter.route("/registerUser").post(verifyJwt, addUser);
adminRouter.route("/login").post(logIn);
adminRouter.route("/logout").post(verifyJwt, logOutAdmin);
adminRouter.route("/updateUser").patch(verifyJwt, updateUserDetails);
adminRouter.route("/deleteUser").delete(verifyJwt, deleteUser);
adminRouter.route("/approveLeave").post(verifyJwt,approveLeave);
adminRouter.route("/rejectLeave").post(verifyJwt,rejectLeave);
export default adminRouter;
