const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    likes: [
      {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "User",
      },
    ],
    photos: [
      {
        type: Buffer,
        contentType: String,
      },
    ],
    postedBy: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "User",
    },
    comments: [
      {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "Comment",
      },
    ],
  },
  { timestamps: true }
);

exports.Post = mongoose.model("Post", postSchema);
