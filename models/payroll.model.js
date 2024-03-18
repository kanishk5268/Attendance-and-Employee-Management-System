import { Schema, model } from "mongoose";

const payrollSchema = new Schema(
  {
    uId: {
      type: Schema.Types.ObjectId,
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

const Payroll = model("Payroll", payrollSchema);

export default Payroll;
