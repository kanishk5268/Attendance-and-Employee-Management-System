const mongoose = require("mongoose");

const performanceSchema = new mongoose.Schema(
  {
    uId: {
      type: mongoose.Schema.Types.ObjectId,
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

const Performance = mongoose.model("Performance", performanceSchema);

module.exports = Performance;
