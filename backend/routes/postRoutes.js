const express = require("express");
const {
  getAllPosts,
  likePost,
  GetUserlikedPost,
} = require("../controller/postController");
const validateToken = require("../middleware/validateTokenHandler");

const router = express.Router();
router.use(validateToken);
router.get("/", getAllPosts);
router.patch("/:id/:userId", likePost);
router.get("/:userId", GetUserlikedPost);

module.exports = router;
