const {
  logout,
  login,
  refresh,
  resetPasswordRrequest,
  registerVerification,
  resetPassword,

  Subscribe,
  getUserByID,
  getUserSubscibers,
  getLoginUser,
} = require("../controller/authController");

const express = require("express");
const validateToken = require("../middleware/validateTokenHandler");
const router = express.Router();

router.post("/login", login);

router.get("/logout", validateToken, logout);

router.get("/refresh", refresh);

router.post("/reset-password-request", resetPasswordRrequest);

router.post("/email-verification", registerVerification);

router.post("/reset-password", resetPassword);
router.patch("/:userId/:subscriberId",validateToken, Subscribe);
router.post("/user/",validateToken, getUserByID);
router.post("/getUserSubscibers/",validateToken, getUserSubscibers);
router.get("/own/",validateToken, getLoginUser);
  
module.exports = router; 
