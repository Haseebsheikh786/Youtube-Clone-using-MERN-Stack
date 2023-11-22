import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchAllPosts } from "./postApi";

const initialState = {
  posts: [],
  status: "idle",
};

export const fetchAllPostsAsync = createAsyncThunk(
  "post/fetchAllPosts",
  async () => {
    const response = await fetchAllPosts();
    console.log(response);
    return response;
  }
);

export const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllPostsAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAllPostsAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.posts = action.payload;
      });
  },
});

export const selectAllPosts = (state) => state.post.posts;

export default postSlice.reducer;
