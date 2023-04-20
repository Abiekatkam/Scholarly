import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentPost: null,
  loading: false,
  error: false,
};

export const postSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    postStart: (state) => {
      state.loading = true;
    },
    postSuccess: (state, action) => {
      state.loading = false;
      state.currentPost = action.payload;
    },
    postOnLoad: (state, action) => {
      state.currentPost.push(action.payload);
    },
    postFailure: (state) => {
      state.loading = false;
      state.error = true;
    },
    postLikes: (state, action) => {
      if (state.currentPost.likes.includes(action.payload)) {
        state.currentPost.likes.splice(
          state.currentPost.likes.findIndex(
            (userId) => userId === action.payload
          ),
          1
        );
      } else {
        state.currentPost.likes.push(action.payload);
      }
    },
  },
});

export const { postStart, postSuccess, postFailure, postLikes, postOnLoad } =
  postSlice.actions;

export default postSlice.reducer;
