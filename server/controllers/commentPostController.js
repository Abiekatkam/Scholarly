import { createError } from "../error.js";
import CommentPost from "../models/CommentPost.js";

export const addComment = async (req, res, next) => {
  const newComment = new CommentPost({ ...req.body });
  try {
    const savedComment = await newComment.save();
    res.status(200).json(savedComment);
  } catch (error) {
    next(error);
  }
};

export const deleteComment = async (req, res, next) => {
  try {
    // const comment = await Comment.findById(req.params.id);
    // const course = await Course.findById(req.params.id);

    const { userId, commentId, postId } = req.body;

    if (userId === postId) {
      await CommentPost.findByIdAndDelete(commentId);
      res.status(200).json("Comment deleted successfully");
    } else {
      return next(createError(403, "You can delete only your comment"));
    }
  } catch (error) {
    next(error);
  }
};

export const getComment = async (req, res, next) => {
  try {
    const comment = await CommentPost.find({ postId: req.params.postId });
    res.status(200).json(comment);
  } catch (error) {
    next(error);
  }
};
