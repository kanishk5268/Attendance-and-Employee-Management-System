import { Schema, model } from "mongoose";

const leaveSchema = new Schema(
  {
    uId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    sStatus: {
      type: String,
      required: [true, "Status is required"],
      enum: ["pending", "approved", "rejected"],
      trim: true,
      default:'pending'
    },
    sLeaveType: {
      type: String,
      required: [true, "Leave type is required"],
      enum: ["half day", "full day"],
      trim: true,
    },
    dFromDate: {
      type: Date,
      required: [true, "From date is required"],
    },
    dToDate: {
      type: Date,
      required: [true, "To date is required"],
    },
    tFromTime: {
      type: String,
      required: [true, "From time is required"],
    },
    tToTime: {
      type: String,
      required: [true, "To time is required"],
    },
    sSubjectOfLeave: {
      type: String,
      required: [true, "Type of leave is required"],
      enum: [
        "Privilege Leave(PL)",
        "Casual Leave (CL)",
        "Sick Leave(SL)",
        "Maternity Leave(ML)",
        "Compensatory Off(Comp-off)",
        "Marriage Leave",
        "Paternity Leave",
        "Bereavement Leave",
        "Loss of Pay Leave(LOP)",
      ],
    },
    sBody: {
      type: String,
      required: [true, "Body is required"],
    },
  },
  {
    timestamps: true,
  }
);

const Leave = model("Leave", leaveSchema);

export default Leave;
