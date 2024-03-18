import { Schema, model } from "mongoose";

const reportSchema = new Schema(
  {
    uId: {
      type: Schema.Types.ObjectId,
      ref: "Users",
    },
    // sPerformance:{
    //     type:mongoose.Schema.Types.ObjectId,
    //     ref:"Performance"
    // },
    sAttendance: {
      type: Schema.Types.ObjectId,
      ref: "Attendance",
    },
    sLeave: {
      type: Schema.Types.ObjectId,
      ref: "Leave",
    },
  },
  {
    timestamps: true,
  }
);

const Report = model("Report", reportSchema);

export default Report;
