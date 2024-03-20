import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { ApiError, asyncHandler } from "./../utils/index.js";
import User from './../models/user.model.js';

dotenv.config({ path: "./.env" });

const verifyJwt = asyncHandler(async (req, res, next) => {
  
  const token = req.cookies?.accessToken ||req.header("Authorization")?.replace("Bearer ", "");
  if (!token) throw new ApiError(401, "Unauthorized request.");
  
  const decodedToken = jwt.verify(token, process.env.JWT_TOKEN_SECRET);

  if(!decodedToken)throw new ApiError(400,'Invalid accessToken')

  req.user= {
    _id: decodedToken._id,
    sAccess: decodedToken.sAccess
  }
  next();
});

export default verifyJwt;


