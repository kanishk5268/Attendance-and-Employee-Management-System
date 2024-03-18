const mongoose = require("mongoose");

const leaveSchema = new mongoose.Schema(
  {
    uId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
    },
    sStatus: {
      type: String,
      required: [true, "Status is required"],
      enum: ["pending", "approved", "rejected"],
      trim: true,
    },
    sLeaveType: {
      type: String,
      required: [true, "Leave type is required"],
      enum: ["half day", "full day"],
      trim: true,
    },
    dtFromDate: {
      type: Date,
      required: [true, "From date is required"],
    },
    dtToDate: {
      type: Date,
      required: [true, "To date is required"],
    },
    dtFromTime: {
      type: Date,
      required: [true, "From time is required"],
    },
    dtToTime: {
      type: Date,
      required: [true, "To time is required"],
    },
    sTypeOfLeave: {
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

const Leave = mongoose.model("Leave", leaveSchema);

module.exports = Leave;
