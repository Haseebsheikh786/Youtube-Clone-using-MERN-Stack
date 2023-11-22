const mongoose = require("mongoose");

const postSchema = mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    name: { 
      type: String,
      required: true,
    },
    userPicturePath: String,
    description: String,
    picturePath: String,
    likes: {
      type: Map,
      of: Boolean,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Post", postSchema);
