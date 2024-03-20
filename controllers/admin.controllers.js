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

const logInUser = asyncHandler(async (req, res) => {
  /*Steps for Logging In 
    1.) Take email and password from the user.
    2.) If the email or password field is empty then throw error.
    3.) Check if the email and password exist and they match with the user document present in the database. If they don't match throw error
    4.) Verify the password 
    5.) If they match generate accesstoken and let them in*/

  const { sEmail, sPassword } = req.body;
  if (!sEmail || !sPassword) throw new ApiError(400, "Invalid input");
  const user = await User.findOne({ sEmail });
  if (!user) throw new ApiError(404, "User does not exist");
  const verifyPassword = await user.isPasswordCorrect(sPassword);
  if (!verifyPassword) throw new ApiError(401, "Invalid user credentials");
  const accesstoken = await user.generateAccessToken(user._id);
  const loggedInUser = await User.findById(user._id).select(
    "-password "
  );
  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .cookie("accessToken", accesstoken, options)
    .json(
      new ApiResponse(200,
      "User logged in successfully")
    );
});

// const getJwt = asyncHandler(async (req, res) => {
//   const user = await User.findOne({ _id: req.body.id });
//   const token = await user.generateAccessToken();
//   res.json({
//     token,
//   });
// });

export { addUser, logInUser };
