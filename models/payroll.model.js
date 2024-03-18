const mongoose = require("mongoose");

const payrollSchema = new mongoose.Schema(
  {
    uId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    sPayDate: {
      type: Date,
      required: true,
    },
    sHoursWorkedDaily: {
      type: String,
      required: true,
    },
    nSalary: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Payroll = mongoose.model("Payroll", payrollSchema);

module.exports = Payroll;
