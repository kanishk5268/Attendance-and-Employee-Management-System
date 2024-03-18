import { Schema, model } from "mongoose";

const attendanceSchema = new Schema(
  {
    uId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    sLogIn: {
      type: Date,
      required: [true, "Log In time is required"],
      trim: true,
    },
    sLogOut: {
      type: Date,
      required: [true, "Log Out time is required"],
      trim: true,
    },
    aBreaks: [
      {
        type: String,
        required: [true, "Time of Break is required"],
      },
    ],
    sArrival: {
      type: String,
      required: [true, "Arrival status is required"],
      enum: ["On Time", "Late"],
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

const Attendance = model("Attendance", attendanceSchema);

export default Attendance;
