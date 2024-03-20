import { asyncHandler, ApiError, ApiResponse } from "../utils/index.js";
import User from "../models/user.model.js";
import { config } from "dotenv";
config();

const logOut = asyncHandler(async (req, res) => {
  await User.findByIdAndUpdate(
    req.user._id,
    {
      $set: {
        accessToken: undefined,
      },
    },
    {
      new: true,
    }
  );
  const options = {
    httpOnly:true,
    secure:true,
  };
  return res.status(200).clearCookie("accessToken",options).json(new ApiResponse(200,{},"User logged out"));
});

export default logOut;
