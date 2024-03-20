import { ApiError, ApiResponse, asyncHandler } from "./../utils/index.js";
import User from "./../models/user.model.js";
import { config } from "dotenv";
config();


const logIn = asyncHandler(async (req, res) => {
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

  export default logIn;