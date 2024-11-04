import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  currentUser: null,
  error: null,
  loading: false,
  value: "faizan",
};

export const register = createAsyncThunk(
  "auth/register",
  async (userData, thunkAPI) => {
    console.log(userData);
    try {
      const response = await axios.post("/api/v1/users/register", userData);
      // console.log("response is", response);
      return response.data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.response.data.errors);
    }
  }
);

export const login = createAsyncThunk("auth/login", async (user, thunkAPI) => {
  // console.log(user);
  try {
    const response = await axios.post("/api/v1/users/login", user);
    console.log("response is", response);
    return response.data;
  } catch (error) {
    console.log(error);
    return thunkAPI.rejectWithValue(error.response.data.errors);
  }
});

export const getCurrentUser = createAsyncThunk(
  "auth/getCurrentUser",
  async (_, thunkAPI) => {
    try {
      const token = localStorage.getItem("accessToken") ?? "";
      const response = await axios.get("/api/v1/users/getUser", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // console.log("response is", response);
      return response.data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.response.data.errors);
    }
  }
);

export const logout = createAsyncThunk("auth/logout", async (_, thunkAPI) => {
  try {
    const response = axios.get("/api/v1/users/logout");
    localStorage.removeItem("accessToken");
    return response.data;
  } catch (error) {
    console.log(error);
    return thunkAPI.rejectWithValue(error.response.data.errors);
  }
});

export const userSlice = createSlice({
  name: "User",
  initialState,

  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.loading = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false;
        state.currentUser = action.payload;
      })
      .addCase(register.rejected, (state) => {
        state.loading = false;
      })

      // for login
      .addCase(login.pending, (state) => {
        state.loading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.currentUser = action.payload;
      })
      .addCase(login.rejected, (state) => {
        state.loading = false;
      })

      // get current user
      .addCase(getCurrentUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(getCurrentUser.fulfilled, (state, action) => {
        state.loading = false;
        state.currentUser = action.payload;
      })
      .addCase(getCurrentUser.rejected, (state) => {
        state.loading = false;
        state.currentUser = null;
      })

      //for logout
      .addCase(logout.fulfilled, (state) => {
        state.loading = false;
        state.currentUser = null;
      });
  },
  reducers: {},
});

export const { _ } = userSlice.actions;
export default userSlice.reducer;
