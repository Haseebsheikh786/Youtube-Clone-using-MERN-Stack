const mongoose = require("mongoose");

const commentSchema = mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    postId: {
      type: String,
      required: true,
    },
    description: String,
  },
  { timestamps: true }
);
exports.Comment = mongoose.model("Comment", commentSchema);
