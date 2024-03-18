const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
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
      unique: [unique, "User with this email already exists"],
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
    sRole: {
      type: String,
      required: [true, "Role is required"],
      enum: [
        "Admin",
        "Sub Admin",
        "General Manager",
        "Team Lead",
        "Project Manager",
        "Project Lead",
        "Employee",
      ],
      default: "Employee",
    },
    sPosition: {
      type: String,
      required: [true, "Dev role is required"],
      enum: [
        "Admin",
        "HR",
        "Frontend Developer",
        "Backend Devloper",
        "Full Stack Developer",
      ],
    },
    sAccess: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Access",
    },
    nAge: {
      type: Number,
      required: [true, "Age is required"],
      trim: true,
      max: [80, "Age cannot be greater than 80 "],
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
    // sBiometricId:{}
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
