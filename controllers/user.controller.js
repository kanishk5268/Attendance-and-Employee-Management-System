import { asyncHandler, ApiError, ApiResponse } from "../utils/index.js";
import User from "../models/user.model.js";
import { config } from "dotenv";
import Leave from "../models/leave.model.js";
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
    httpOnly: true,
    secure: true,
  };
  return res
    .status(200)
    .clearCookie("accessToken", options)
    .json(new ApiResponse(200, {}, "User logged out"));
});

const applyLeave = asyncHandler(async (req, res) => {
  //1.) check if the required details are there or not
  const uId = req.params?.id;
  const {
    sLeaveType,
    dFromDate,
    dToDate,
    tFromTime,
    tToTime,
    sSubjectOfLeave,
    sBody,
  } = req.body;

  if (
    !sLeaveType ||
    !dFromDate ||
    !dToDate ||
    !tFromTime ||
    !tToTime ||
    !sSubjectOfLeave ||
    !sBody
  )
    throw new ApiError(400, "Invalid input");

  const leave = new Leave({
    uId,
    sLeaveType,
    dFromDate,
    dToDate,
    tFromTime,
    tToTime,
    sSubjectOfLeave,
    sBody
  });
  let newLeave = await leave.save();
  if(!newLeave) throw new ApiError(400,"Apply for leave could not be processed");
  res.status(200).json(new ApiResponse(200,{
    newLeave,
  },"Applied for Leave"))
});

export {logOut,applyLeave};
