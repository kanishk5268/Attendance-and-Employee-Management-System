const mongoose = require("mongoose");

const reportSchema = new mongoose.Schema(
  {
    uId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
    },
    // sPerformance:{
    //     type:mongoose.Schema.Types.ObjectId,
    //     ref:"Performance"
    // },
    sAttendance: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Attendance",
    },
    sLeave: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Leave",
    },
  },
  {
    timestamps: true,
  }
);

const Report = mongoose.model("Report", reportSchema);

module.exports = Report;
