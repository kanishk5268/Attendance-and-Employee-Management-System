import { Schema, model } from "mongoose";

const taskSchema = new Schema(
  {
    uId: {
      type: Schema.Types.ObjectId,
      ref: "Users",
    },
    sTaskAssigned: {
      type: String,
      required: true,
    },
    sTaskStatus: {
      type: String,
      required: true,
      enum: ["Assigned", "In Progress", "Pending", "Completed"],
      trim: true,
    },
    dtTaskAssignedTime: {
      type: Date,
      required: true,
    },
    dtTaskScheduledCompleteTime: {
      type: Date,
      required: true,
    },
    dtTaskAssignedCompletedTime: {
      type: Date,
      required: true,
    },
    dtTaskCompleteStatus: {
      type: String,
      required: true,
      enum: ["On Time", "Late"],
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

const Task = model("Task", taskSchema);

export default Task;
