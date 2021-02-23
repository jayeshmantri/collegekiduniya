const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      maxlength: 20,
    },
    url: {
      type: String,
    },
    github_url: {
      type: String,
    },
    project_photos: [
      {
        type: Buffer,
        contentType: String,
      },
    ],
    likes: [
      {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "User",
      },
    ],
  },
  { timestamps: true }
);

exports.Project = mongoose.mongo("Project", projectSchema);
