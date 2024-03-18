import { Schema, model } from "mongoose";

const accessSchema = new Schema(
  {
    sAccessRole: {
      type: String,
      required: [true, "Type of role is required"],
      trim: true,
      enum: [
        "Admin",
        "Sub Admin",
        "General Manager",
        "Team Lead",
        "Project Manager",
        "Project Lead",
      ],
    },
    sTypesOfAccess: [
      {
        type: String,
        required: true,
        enum: [
          "Create",
          "Update",
          "Delete",
          "Extract Report",
          "Approve Leave",
          "Reject Leave",
        ],
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Access = model("Access", accessSchema);

export default Access;
