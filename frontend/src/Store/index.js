import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../Pages/Auth/authSlice";
import postSlice from "../Pages/Home/post/postSlice";
import videoSlice from "../Pages/Home/Video/videoSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    post: postSlice,
    video: videoSlice,
  },
});
