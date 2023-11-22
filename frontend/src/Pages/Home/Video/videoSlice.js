import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getAllVideos,
  getUserLikeVideos,
  getVideoByID,
  getVideosByUserId,
} from "./videoApi";

const initialState = {
  videos: [],
  Uservideos: [],
  LikedVideos: [],
  selectedVideo: null,
  isLoading: false,
};

// Register user
export const getVideoByIDAsync = createAsyncThunk(
  "video/getVideoByID",
  async (id, thunkAPI) => {
    try {
      return await getVideoByID(id);
    } catch (error) {
      console.log(error);
    }
  }
);
export const getVideosByUserIdAsync = createAsyncThunk(
  "video/getVideosByUserId",
  async (id, thunkAPI) => {
    try {
      return await getVideosByUserId(id);
    } catch (error) {
      console.log(error);
    }
  }
);
export const getUserLikeVideosAsync = createAsyncThunk(
  "video/getUserLikeVideos",
  async (id, thunkAPI) => {
    try {
      return await getUserLikeVideos(id);
    } catch (error) {
      console.log(error);
    }
  }
);
export const getAllVideosAsync = createAsyncThunk(
  "video/getAllVideosAsync",
  async () => {
    const response = await getAllVideos();
    console.log(response);
    return response;
  }
);

export const authSlice = createSlice({
  name: "video",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllVideosAsync.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllVideosAsync.fulfilled, (state, action) => {
        state.videos = action.payload;
      })

      .addCase(getVideoByIDAsync.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getVideoByIDAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.selectedVideo = action.payload;
      })
      .addCase(getVideosByUserIdAsync.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getVideosByUserIdAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.Uservideos = action.payload;
      })
      .addCase(getUserLikeVideosAsync.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUserLikeVideosAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.LikedVideos = action.payload;
      });
  },
});

export const selectAllVideos = (state) => state.video.videos;
export const selectVideobyId = (state) => state.video.selectedVideo;
export const selectUserVideos = (state) => state.video.Uservideos;
export const selectLikedVideos = (state) => state.video.LikedVideos;

export default authSlice.reducer;
