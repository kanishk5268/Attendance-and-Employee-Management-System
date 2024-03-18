import { Schema, model } from "mongoose";

const performanceSchema = new Schema(
  {
    uId: {
      type: Schema.Types.ObjectId,
      ref: "Users",
    },
    nTotalTaskAssigned: {
      type: Number,
    },
    nTotalTaskCompletedOnTime: {
      type: Number,
    },
    nTotalTaskCompletedLate: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);

const Performance = model("Performance", performanceSchema);

export default Performance;
