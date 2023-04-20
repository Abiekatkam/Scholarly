import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentCommentPost: [],
  loading: false,
  error: false,
};

export const commentPostSlice = createSlice({
  name: "commentPost",
  initialState,
  reducers: {
    commentPostStart: (state) => {
      state.loading = true;
    },
    commentPostSuccess: (state, action) => {
      state.loading = false;
      state.currentCommentPost = action.payload;
    },
    commentPostFailure: (state) => {
      state.loading = false;
      state.error = true;
    },
    commentPostOnLoad: (state, action) => {
      state.currentCommentPost.push(action.payload);
    },
    removePostComment: (state, action) => {
      state.currentCommentPost = state.currentCommentPost.filter(
        (comment) => comment._id !== action.payload
      );
    },
  },
});

export const {
  commentPostStart,
  commentPostSuccess,
  commentPostFailure,
  commentPostOnLoad,
  removePostComment,
} = commentPostSlice.actions;

export default commentPostSlice.reducer;
