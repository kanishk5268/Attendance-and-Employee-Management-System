import { ApiError, ApiResponse, asyncHandler } from "./../utils/index.js";
import User from "./../models/user.model.js";
import { config } from "dotenv";
import checkAccess from "../middlewares/checkAccess.middleware.js";
config();

const addUser = asyncHandler(async (req, res, next) => {
  /*Steps to add user
    
    at the start check if the user is admin or not.

     1.) get the full name, email,username,password,role,position,access,age,gender,type of employee from the user(admin in this case).
     
     2.) check whether all the fields are there or not.
     
     3.) if any field is empty then throw error.
     
     4.) hash the password of the user before saving.
     
     5.) create the user document.*/

  const isAccess = await checkAccess(req, "Create");
  if (!isAccess) throw new ApiError(400, "You don't have access");
  const {
    sFullName,
    sAccess,
    sEmail,
    sUserName,
    sPassword,
    sRole,
    sPosition,
    nAge,
    dtDOB,
    sGender,
    sTypeOfEmployee,
    dtJoiningDate,
  } = req.body;

  if (
    !sFullName ||
    !sEmail ||
    !sUserName ||
    !sPassword ||
    !sRole ||
    !sPosition ||
    !nAge ||
    !sGender ||
    !sTypeOfEmployee ||
    !dtJoiningDate
  )
    throw new ApiError(400, "Invalid input");

  const existingUser = await User.findOne({ sUserName, sEmail });
  if (existingUser) throw new ApiError(400, "User already exists");
  const createNewUser = new User({
    sFullName,
    sEmail,
    sUserName,
    sPassword,
    sRole,
    sPosition,
    nAge,
    dtDOB,
    sAccess,
    dtJoiningDate,
    sGender,
    sTypeOfEmployee,
  });

  let newUser = await createNewUser.save({ validateBeforeSave: false });
  if (!newUser) throw new ApiError(400, "Cannot create your account");
  newUser = await User.findById({ _id: newUser._id }).select(
    "-sPassword -__v -updatedAt"
  );
  res.status(200).json(
    new ApiResponse(
      200,
      {
        newUser,
      },
      "User is created"
    )
  );
});

const logOutAdmin = asyncHandler(async (req, res) => {
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
    .json(new ApiResponse(200, {}, "Admin logged out"));
});

const updateUserDetails = asyncHandler(async (req, res) => {
  const updateUser = await User.findByIdAndUpdate(
    { _id: req.user?.id },
    req.body,
    {
      new: true,
    }
  );
  if (!updateUser) throw new ApiError(500, "Cannot update the user details");

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { _id: updateUser._id },
        "Employee details are updated successfully"
      )
    );
});

const deleteUser = asyncHandler(async (req, res) => {
  const _id = req.params.id;
  if (!_id) throw new ApiError(400, "User id is required.");
  const deletedUser = await User.findOneAndDelete({ _id });
  if (!deletedUser) throw new ApiError(500, "Can't delete user.");
  return res
    .status(200)
    .json(new ApiResponse(200, deleteUser, "User is deleted successfully."));
});

const updateAdminDetails = asyncHandler(async (req, res) => {
  if (!req.user?.bIsAdmin)
    throw new ApiError(400, "You don't have required permissions");
  const updatedAdmin = await Admin.findByIdAndUpdate(
    { _id: req.user?._id },
    req.boody,
    { new: true }
  );
  if (!updatedAdmin) throw new ApiError(500, "can't update admin details.");
  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { _id: updatedAdmin._id },
        "admin is successfully updated."
      )
    );
});
// const getJwt = asyncHandler(async (req, res) => {
//   const user = await User.findOne({ _id: req.body.id });
//   const token = await user.generateAccessToken();
//   res.json({
//     token,
//   });
// });

export { addUser, logOutAdmin, updateUserDetails, deleteUser };
