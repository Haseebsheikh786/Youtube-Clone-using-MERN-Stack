const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/userModels");
const RefreshToken = require("../models/token");
const { sendMail } = require("../constants");
const crypto = require("crypto");
const expressAsyncHandler = require("express-async-handler");

const register = expressAsyncHandler(async (req, res) => {
  const { username, email, password } = req.body;
  // if any field is empty
  if (!username || !email || !password) {
    res.status(400).json({ error: "All fields are mandatory" });
    throw new Error("All fields are mandatory");
  }

  // if email available in database
  const userAvailable = await User.findOne({ email });
  if (userAvailable) {
    res.status(400).json({ error: "User already registerd" });
    throw new Error("User already registerd");
  }

  // password Hashing
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await User.create({
    username,
    email,
    password: hashedPassword,
    photo: req.file.filename,
  });

  if (user) {
    const token = crypto.randomBytes(48).toString("hex");
    user.verificationToken = token;
    await user.save();

    // Also set token in email
    const resetPageLink =
      "http://localhost:3000/verify-email?token=" + token + "&email=" + email;
    const subject = "email verification for Auth Checking";
    const html = `<p>Click <a href='${resetPageLink}'>here</a> to verify email</p>`;
    const response = await sendMail({ to: email, subject, html });
    res.status(201).json({ _id: user.id, email: user.email, response });
  } else {
    res.status(400).json({ error: "user data is not valid" });
    throw new Error("user data is not valid");
  }
  res.json({ message: "Register the user" });
});

const registerVerification = expressAsyncHandler(async (req, res) => {
  const { email, token } = req.body;

  const user = await User.findOne({
    email: email,
    verificationToken: token,
  });
  if (user) {
    user.Isverified = true;
    await user.save();
    const subject = "user successfully verified for Auth Checking";
    const html = `<p>congratulation you are verified </p>`;
    if (email) {
      const response = await sendMail({ to: email, subject, html });
      res.json(response);
    } else {
      res.sendStatus(400);
    }
  } else {
    res.sendStatus(400);
  }
});

const login = expressAsyncHandler(async (req, res) => {
  let auth = false;
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400).json({ error: "All fields are mandatory", auth });
    throw new Error("All fields are mandatory");
  }
  const userAvailable = await User.findOne({ email });

  if (
    userAvailable &&
    (await bcrypt.compare(password, userAvailable.password))
  ) {
    auth = true;
    const token = jwt.sign(
      { _id: userAvailable._id },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: "1m",
      }
    );
    const refreshToken = jwt.sign(
      { _id: userAvailable._id },
      process.env.REFRESH_TOKEN_SECRET,
      {
        expiresIn: "7d",
      }
    );
    try {
      await RefreshToken.updateOne(
        {
          _id: userAvailable._id,
        },
        { token: refreshToken },
        { upsert: true }
      );
    } catch (error) {
      return next(error);
    }
    res.cookie("token", token, {
      maxAge: 1000 * 60 * 60 * 24,
      httpOnly: true,
    });
    res.cookie("refreshToken", refreshToken, {
      maxAge: 1000 * 60 * 60 * 24,
      httpOnly: true,
    });
    res.status(200).json({
      _id: userAvailable._id,
      email: userAvailable.email,
      username: userAvailable.username,
      photo: userAvailable.photo,
      subscribers: userAvailable.subscribers,
      auth,
    });
  } else {
    auth = false;
    res.status(400).json({ error: "email or password is not valid", auth });
    throw new Error("email or password is not valid");
  }
});

const logout = expressAsyncHandler(async (req, res) => {
  const { refreshToken } = req.cookies;

  try {
    await RefreshToken.deleteOne({ token: refreshToken });
  } catch (error) {
    return next(error);
  }

  // delete cookies
  res.clearCookie("token");
  res.clearCookie("refreshToken");

  // 2. response
  res.status(200).json({ user: null });
});

const refresh = expressAsyncHandler(async (req, res) => {
  // 1. get refreshToken from cookies
  // 2. verify refreshToken
  // 3. generate new tokens
  // 4. update db, return response

  const originalRefreshToken = req.cookies.refreshToken;

  let id;

  try {
    id = jwt.verify(originalRefreshToken, process.env.REFRESH_TOKEN_SECRET)._id;
  } catch (e) {
    res.status(401).json({ error: "Unauthorized" });
    throw new Error("Unauthorized");
  }

  try {
    const match = RefreshToken.findOne({
      _id: id,
      token: originalRefreshToken,
    });

    if (!match) {
      res.status(401).json({ error: "Unauthorized" });
      throw new Error("Unauthorized");
    }
  } catch (e) {
    console.log(e);
  }

  try {
    const token = jwt.sign({ _id: id }, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: "1m",
    });
    const refreshToken = jwt.sign(
      { _id: id },
      process.env.REFRESH_TOKEN_SECRET,
      {
        expiresIn: "7d",
      }
    );

    await RefreshToken.updateOne({ _id: id }, { token: refreshToken });

    res.cookie("token", token, {
      maxAge: 1000 * 60 * 60 * 24,
      httpOnly: true,
    });

    res.cookie("refreshToken", refreshToken, {
      maxAge: 1000 * 60 * 60 * 24,
      httpOnly: true,
    });
  } catch (e) {
    return next(e);
  }

  const user = await User.findOne({ _id: id });

  return res.status(200).json({ user: user });
});

const resetPasswordRrequest = expressAsyncHandler(async (req, res) => {
  const email = req.body.email;
  const user = await User.findOne({ email: email });
  if (user) {
    const token = crypto.randomBytes(48).toString("hex");
    user.resetPasswordToken = token;
    await user.save();

    // Also set token in email
    const resetPageLink =
      "http://localhost:3000/reset-password?token=" + token + "&email=" + email;
    const subject = "reset password for Auth Checking";
    const html = `<p>Click <a href='${resetPageLink}'>here</a> to Reset Password</p>`;

    if (email) {
      const response = await sendMail({ to: email, subject, html });
      res.json(response);
    } else {
      res.status(400).json("user not found");
      throw new Error("user not found");
    }
  } else {
    res.status(400).json("user not found");
    throw new Error("user not found");
  }
});

const resetPassword = expressAsyncHandler(async (req, res) => {
  const { email, token, password } = req.body;

  const user = await User.findOne({
    email: email,
    resetPasswordToken: token,
  });
  const hashedPassword = await bcrypt.hash(password, 10);
  if (user) {
    user.password = hashedPassword;
    await user.save();
    const subject = "password successfully reset for Auth Checking";
    const html = `<p>Successfully able to Reset Password</p>`;
    if (email) {
      const response = await sendMail({ to: email, subject, html });
      res.json(response);
    } else {
      res.sendStatus(400);
    }
  } else {
    res.sendStatus(400);
  }
});

const Subscribe = expressAsyncHandler(async (req, res) => {
  const { userId, subscriberId } = req.params;

  try {
    const user = await User.findById(userId);
    const subscriber = await User.findById(subscriberId);

    const isSubscribed = subscriber.subscribers.includes(userId);

    if (isSubscribed) {
      await User.findByIdAndUpdate(subscriberId, {
        $pull: { subscribers: userId },
      });
    } else {
      await User.findByIdAndUpdate(subscriberId, {
        $push: { subscribers: userId },
      });
    }

    const updatedUser = await User.findById(subscriberId);
    res.json(updatedUser.subscribers.length);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

const getUserSubscibers = expressAsyncHandler(async (req, res) => {
  try {
    const { id } = req.body;
    const user = await User.findById(id);
    if (user) {
      const subcribers = await Promise.all(
        user.subscribers.map((id) => User.findById(id))
      );
      const formattedFriends = subcribers.map(({ _id, username }) => {
        return { _id, username };
      });
      res.status(200).json(formattedFriends);
    } else {
      console.log("user nahi ha");
    }
  } catch (err) {
    res.status(404).json({ message: err.message });
    console.log(err, "err ha haseeb");
  }
});

const getUserByID = expressAsyncHandler(async (req, res) => {
  try {
    const { id } = req.body;
    const userAvailable = await User.findOne({ _id: id });
    res.status(200).json({
      _id: userAvailable._id,
      email: userAvailable.email,
      username: userAvailable.username,
      photo: userAvailable.photo,
      subscribers: userAvailable.subscribers,
    });
  } catch (err) {
    res.status(404).json({ message: err.message });
    console.log(err, "err");
  }
});
const getLoginUser = expressAsyncHandler(async (req, res) => {
  try {
    const { id } = req.user;
    const userAvailable = await User.findOne({ _id: id });
    res.status(200).json({
      _id: userAvailable._id,
      email: userAvailable.email,
      username: userAvailable.username,
      photo: userAvailable.photo,
      subscribers: userAvailable.subscribers,
    });
  } catch (err) {
    res.status(404).json({ message: err.message });
    console.log(err, "err");
  }
});

module.exports = {
  getUserSubscibers,
  register,
  registerVerification,
  login,
  logout,
  refresh,
  resetPasswordRrequest,
  resetPassword,
  Subscribe,
  getUserByID,
  getLoginUser,
};
