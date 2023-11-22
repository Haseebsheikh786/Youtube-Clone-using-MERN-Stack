const express = require("express");

const {
  createComment, 
  getAllComments,
} = require("../controller/commentController");   
const validateToken = require("../middleware/validateTokenHandler");

const router = express.Router();
router.use(validateToken);

router.post("/", createComment);
router.get("/:postId", getAllComments);

module.exports = router;
