import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  Login,
  logout,
  resetPasswordRequest,
  resetPassword,
  emailVerification,
  getUserByID,
  getUserSubscribers,
  GetLoginUser,
} from "./authApi";

const initialState = {
  user: null,
  SelectedUser: null,
  UserSubscribers: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
  mailSent: false,
  passwordReset: false,
  isVerified: false,
};

// Login user
export const login = createAsyncThunk("auth/login", async (user, thunkAPI) => {
  try {
    return await Login(user);
  } catch (error) {
    alert("email or password is not valid");
  }
});
export const getUserByIDAsync = createAsyncThunk(
  "auth/getUserByID",
  async (id) => {
    try {
      return await getUserByID(id);
    } catch (error) {
      console.log(error);
    }
  }
);
export const GetLoginUserAsync = createAsyncThunk(
  "auth/GetLoginUser",
  async () => {
    try {
      return await GetLoginUser();
    } catch (error) {
      console.log(error);
    }
  }
);
export const getUserSubscribersAsync = createAsyncThunk(
  "auth/getUserSubscribers",
  async (id) => {
    try {
      return await getUserSubscribers(id);
    } catch (error) {
      console.log(error);
    }
  }
);

export const Logout = createAsyncThunk("auth/logout", async () => {
  await logout();
});
export const resetPasswordRequestAsync = createAsyncThunk(
  "user/resetPasswordRequest",
  async ({ email, alert }, { rejectWithValue }) => {
    try {
      const response = await resetPasswordRequest(email);
      return response.data;
    } catch (error) {
      alert.error(error);
      return rejectWithValue(error);
    }
  }
);

export const resetPasswordAsync = createAsyncThunk(
  "user/resetPassword",
  async (data, { rejectWithValue }) => {
    try {
      const response = await resetPassword(data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
export const emailVerificationAsync = createAsyncThunk(
  "user/emailVerification",
  async (data, { rejectWithValue }) => {
    try {
      const response = await emailVerification(data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.user = null;
      })
      .addCase(GetLoginUserAsync.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(GetLoginUserAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
      })
      .addCase(getUserByIDAsync.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUserByIDAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.SelectedUser = action.payload;
      })
      .addCase(getUserSubscribersAsync.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUserSubscribersAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.UserSubscribers = action.payload;
      })
      .addCase(Logout.fulfilled, (state) => {
        state.user = null;
      })
      .addCase(resetPasswordRequestAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(resetPasswordRequestAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.mailSent = true;
      })
      .addCase(resetPasswordAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(resetPasswordAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.passwordReset = true;
      })
      .addCase(emailVerificationAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(emailVerificationAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.isVerified = true;
      });
  },
});

export const selectMailSent = (state) => state.user.mailSent;
export const selectUserInfo = (state) => state.user.user;
export const selectUserByID = (state) => state.user.SelectedUser;
export const selectUserSubscribers = (state) => state.user.UserSubscribers;
export const selectPasswordReset = (state) => state.user.passwordReset;
export const selectIsVerified = (state) => state.user.isVerified;

export default authSlice.reducer;
