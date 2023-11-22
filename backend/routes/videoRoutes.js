const express = require("express");
const {
  getVideoById,
  getAllVideos,
  getVideosByUserId,
  likePost,
  getUserLikes,
} = require("../controller/videoController");
const validateToken = require("../middleware/validateTokenHandler");

const router = express.Router();

router.get("/", getAllVideos);
router.get("/user/:id", validateToken, getVideosByUserId);
router.get("/:id", validateToken, getVideoById);

router.patch("/:id/:userId", validateToken, likePost);
router.get("/:userId/likes", validateToken, getUserLikes);

module.exports = router;
