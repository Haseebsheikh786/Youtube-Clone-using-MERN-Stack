const Post = require("../models/postModel");
const User = require("../models/userModels");
exports.createPost = async (req, res) => {
  try {
    const { userId, description } = req.body;
    const user = await User.findById(userId);
    const newPost = new Post({
      userId,
      name: user.username,
      userPicturePath: user.photo,
      description,
      picturePath: req.file.filename,
      likes: {},
    });
    await newPost.save();

    res.status(200).json(newPost);
  } catch (err) {
    console.log(err);
    res.status(409).json({ error: err.message });
    throw new Error({ error: err.message });
  }
};

exports.getAllPosts = async (req, res) => {
  try {
    const post = await Post.find();
    res.status(200).json(post);
  } catch (err) {
    console.log(err);
    res.status(404).json({ error: err.message });
    throw new Error({ error: err.message });
  }
};

exports.likePost = async (req, res) => {
  try {
    const { userId, id } = req.params;
    const post = await Post.findById(id);
    const isLiked = post.likes.get(userId);

    if (isLiked) {
      post.likes.delete(userId);
    } else {
      post.likes.set(userId, true);
    }

    const updatedPost = await Post.findByIdAndUpdate(
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
exports.GetUserlikedPost = async (req, res) => {
  const { userId } = req.params;

  try {
    // Fetch all documents from the collection
    const allVideos = await Post.find();
  
    // Filter videos on the client side based on the likes map
    const likedVideos = allVideos.filter((video) => {
      return video.likes && video.likes.get(userId) === true;
    });
  
    const formattedLikedVideos = likedVideos.map((video) => ({
      _id: video._id,
      userId: video.userId,
      description: video.description,
      name: video.name,
      picturePath: video.picturePath,
      createdAt: video.createdAt,
    }));
  
    res.json(formattedLikedVideos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
