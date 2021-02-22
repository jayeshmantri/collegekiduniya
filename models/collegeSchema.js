const mongoose = require("mongoose");

const collegeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      unique: true,
    },
    branches: [
      {
        name: {
          type: String,
          unique: true,
        },
        courses: [
          {
            type: string,
            unique: true,
          },
        ],
      },
    ],
    location: {
      pincode: {
        type: Number,
        min: 6,
        max: 6,
        required: true,
      },
      city: {
        type: String,
        required: true,
      },
      state: String,
      required: true,
    },
  },
  { timestamps: true }
);

exports.College = mongoose.model("College", collegeSchema);
