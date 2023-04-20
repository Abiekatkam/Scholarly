import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
  loading: false,
  error: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginStart: (state) => {
      state.loading = true;
    },
    loginSuccess: (state, action) => {
      state.loading = false;
      state.currentUser = action.payload;
    },
    loginFailure: (state) => {
      state.loading = false;
      state.error = true;
    },
    logout: (state) => {
      state.currentUser = null;
      state.loading = false;
      state.error = false;
    },
    wishlist: (state, action) => {
      if (state.currentUser.wishlist.includes(action.payload)) {
        state.currentUser.wishlist.splice(
          state.currentUser.wishlist.findIndex(
            (courseId) => courseId === action.payload
          ),
          1
        );
      } else {
        state.currentUser.wishlist.push(action.payload);
      }
    },
    follow: (state, action) => {
      if (state.currentUser.following.includes(action.payload)) {
        state.currentUser.following.splice(
          state.currentUser.following.findIndex(
            (userId) => userId === action.payload
          ),
          1
        );
      } else {
        state.currentUser.following.push(action.payload);
      }
    },
  },
});

export const {
  loginStart,
  loginSuccess,
  loginFailure,
  logout,
  wishlist,
  follow,
} = userSlice.actions;

export default userSlice.reducer;
