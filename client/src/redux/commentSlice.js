import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentComment: [],
  loading: false,
  error: false,
};

export const commentSlice = createSlice({
  name: "comment",
  initialState,
  reducers: {
    commentStart: (state) => {
      state.loading = true;
    },
    commentSuccess: (state, action) => {
      state.loading = false;
      state.currentComment = action.payload;
    },
    commentFailure: (state) => {
      state.loading = false;
      state.error = true;
    },
    commentOnLoad: (state, action) => {
      state.currentComment.push(action.payload);
    },
    removeComment: (state, action) => {
      state.currentComment = state.currentComment.filter(
        (comment) => comment._id !== action.payload
      );
    },
  },
});

export const {
  commentStart,
  commentSuccess,
  commentFailure,
  commentOnLoad,
  removeComment,
} = commentSlice.actions;

export default commentSlice.reducer;
