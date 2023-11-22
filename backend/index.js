const express = require("express");
const dotenv = require("dotenv").config();
const errorHandler = require("./middleware/errorHandler");
const connectDb = require("./config/dbConnection");
const cors = require("cors");
const morgan = require("morgan");
const path = require("path");
const cookieParser = require("cookie-parser");
const multer = require("multer");
const { register } = require("./controller/authController");
const { createPost } = require("./controller/postController");
const validateToken = require("./middleware/validateTokenHandler");
const { createVideo } = require("./controller/videoController");
const app = express();
const port = process.env.PORT || 8000;

app.use(cookieParser());

app.use(
  cors({
    origin: function (origin, callback) {
      return callback(null, true);
    },
    optionsSuccessStatus: 200,
    credentials: true,
  })
);

app.use(express.static(path.resolve(__dirname, "build")));
app.use(express.static("uploads"));

app.use(express.json());

app.use(morgan("default"));

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    return cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    return cb(null, `${Date.now()} - ${file.originalname}`);
  },
});

const upload = multer({ storage: storage });

// errorHandler
app.use(errorHandler);
// routes
app.post("/signup", upload.single("pic"), register);
app.post("/createPost", upload.single("pic"), createPost);
app.post(
  "/uploadVideo",
  upload.fields([
    { name: "pic", maxCount: 1 },
    { name: "video", maxCount: 1 },
  ]),
  createVideo
);

app.use("/", require("./routes/authRoutes"));
app.use("/post", require("./routes/postRoutes"));
app.use("/comment", require("./routes/commentRoutes"));
app.use("/video", require("./routes/videoRoutes"));
// database connected
connectDb();
// show in terminal
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
