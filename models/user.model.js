import { Schema, model } from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { config } from "dotenv";
config();
const userSchema = new Schema(
  {
    sFullName: {
      type: String,
      required: [true, "Full name is required"],
      trim: true,
      match: {
        regex: /^[A-Za-z]+(?:\s[A-Za-z]+)*$/,
        message: "Please provide with a valid name",
      },
      maxlength: [200, "First name length should be less than 200 characters"],
    },
    sEmail: {
      type: String,
      required: [true, "Email is required"],
      trim: true,
      format: true,
      lowercase: true,
      unique: [true, "User with this email already exists"],
      match: {
        regex: /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/,
        message: "Invalid email",
      },
    },
    sUserName: {
      type: String,
      require: [true, "Username is required"],
      unique: [true, "User with this username already exists"],
      trim: true,
      maxlength: [100, "Username should be less than 100 characters"],
    },
    sPassword: {
      type: String,
      required: [true, "Password is required"],
      trim: true,
      minlength: [8, "Password should be atleast 8 characters long"],
    },
    sPosition: {
      type: String,
      required: [true, "Dev role is required"],
      enum: [
        "HR",
        "Frontend Developer",
        "Backend Devloper",
        "Full Stack Developer",
      ],
    },
    sAccess: [
      {
        type: String,
        required: true,
        enum: [
          "Create",
          "Update",
          "Delete",
          "Extract Report",
          "Approve Leave",
          "Reject Leave",
          "none",
        ],
        default: "none"
      },
    ],
    nAge: {
      type: Number,
      required: [true, "Age is required"],
      trim: true,
      max: [80, "Age cannot be greater than 80 "],
    },
    dtDOB: {
      type: Date,
    },
    sRole: {
      type: String,
      required: [true, "Type of role is required"],
      trim: true,
      enum: [
        "Admin",
        "Sub Admin",
        "General Manager",
        "Team Lead",
        "Project Manager",
        "Project Lead",
        "Employee",
      ],
    },
    sGender: {
      type: String,
      required: [true, "Gender is required"],
      trim: true,
      enum: ["male", "female", "other"],
    },
    sTypeOfEmployee: {
      type: String,
      required: [true, "Type of Employee is required"],
      enum: ["Full Time", "Intern", "Contract"],
      trim: true,
    },
    dtJoiningDate: {
      type: Date,
      required: [true, "Joining date is required"],
    },
    // sBiometricId:{}
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("sPassword")) return next();

  this.sPassword = await bcrypt.hash(this.sPassword, 10);
  next();
});

userSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.sPassword);
};

userSchema.methods.generateAccessToken = function () {
  return jwt.sign(
    {
      _id: this._id,
      sAccess: this.sAccess,
    },
    process.env.JWT_TOKEN_SECRET,
    {
      expiresIn: process.env.JWT_TOKEN_EXPIRY,
    }
  );
};
const User = model("User", userSchema);

export default User;
