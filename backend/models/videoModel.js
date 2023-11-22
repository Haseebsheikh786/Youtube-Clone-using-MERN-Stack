const mongoose = require("mongoose");

const videoSchema = mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },

    video: {
      type: String,
      required: true,
    },
    thumbnail: {
      type: String,
      required: true,
    },
    userPicturePath: String,
    title: String,
    description: String,
    likes: {
      type: Map,
      of: Boolean,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Video", videoSchema);
