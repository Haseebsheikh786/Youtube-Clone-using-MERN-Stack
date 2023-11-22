const Video = require("../models/videoModel");
const User = require("../models/userModels");

exports.createVideo = async (req, res) => {
  try {
    const { userId, description, title } = req.body;
    const user = await User.findById(userId);
    const newVideo = new Video({
      userId,
      name: user.username,
      subcribers: user.subcribers,
      userPicturePath: user.photo,
      description,
      title,
      thumbnail: req.files["pic"][0].filename,
      video: req.files["video"][0].filename,
      likes: [],
    });
    await newVideo.save();

    res.status(200).json(newVideo);
    console.log(newVideo);
  } catch (err) {
    console.log(err);
    res.status(409).json({ error: err.message });
    throw new Error({ error: err.message });
  }
};

exports.getAllVideos = async (req, res) => {
  try {
    const video = await Video.find();
    res.status(200).json(video);
  } catch (err) {
    console.log(err);
    res.status(404).json({ error: err.message });
    throw new Error({ error: err.message });
  }
};
exports.getVideosByUserId = async (req, res) => {
  const { id } = req.params;

  try {
    const video = await Video.find({ userId: id });
    res.status(200).json(video);
  } catch (err) {
    console.log(err);
    res.status(404).json({ error: err.message });
    throw new Error({ error: err.message });
  }
};

exports.getVideoById = async (req, res) => {
  const { id } = req.params;
  try {
    const video = await Video.findOne({ _id: id });
    res.status(200).json(video);
  } catch (err) {
    console.log(err);
    res.status(404).json({ error: err.message });
    throw new Error({ error: err.message });
  }
};

exports.likePost = async (req, res) => {
  try {
    const { userId, id } = req.params;
    const post = await Video.findById(id);
    const isLiked = post.likes.get(userId);

    if (isLiked) {
      post.likes.delete(userId);
    } else {
      post.likes.set(userId, true);
    }

    const updatedPost = await Video.findByIdAndUpdate(
      id,
      { likes: post.likes },
      { new: true }
    );

    res.status(200).json(updatedPost);
  } catch (err) {
    res.status(404).json({ message: err.message });
    console.log(err);
  }
};
exports.getUserLikes = async (req, res) => {
  const { userId } = req.params;

  try {
    const allVideos = await Video.find();

    const likedVideos = allVideos.filter((video) => {
      return video.likes && video.likes.get(userId) === true;
    });

    const formattedLikedVideos = likedVideos.map((video) => ({
      _id: video._id,
      userId: video.userId,
      title: video.title,
      name: video.name,
      thumbnail: video.thumbnail,
      createdAt: video.createdAt,
    }));

    res.json(formattedLikedVideos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
