const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema(
  {
    body: String,
    user: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "User",
    },
    replies: [
      {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "Comment",
      },
    ],
  },
  { timestamps: true }
);

exports.Comment = mongoose.model("Comment", commentSchema);
