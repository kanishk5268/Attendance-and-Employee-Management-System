const mongoose = require("mongoose");

const accessSchema = new mongoose.Schema(
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

const Access = mongoose.model("Access", accessSchema);

module.exports = Access;
