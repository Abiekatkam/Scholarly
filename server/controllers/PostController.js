import Post from "../models/Post.js";
import User from "../models/User.js";

export const addPost = async (req, res, next) => {
  console.log(req.body);
  const newPost = new Post({ ...req.body });
  try {
    const savedPost = await newPost.save();
    res.status(200).json(savedPost);
  } catch (error) {
    next(error);
  }
};

export const updatePost = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return next(createError(404, "Post not found"));

    if (post.userId === req.user.id) {
      const updatedPost = await Post.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        {
          new: true,
        }
      );
      res.status(200).json({
        message: "Post updated successfully",
        Post: updatedPost,
      });
    } else {
      return next(createError(403, "You can update only your Post"));
    }
  } catch (error) {
    next(error);
  }
};

export const deletePost = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return next(createError(404, "Post not found"));

    if (post.userId === req.user.id) {
      await Post.findByIdAndDelete(req.params.id);
      res.status(200).json({
        message: "Post deleted successfully",
      });
    } else {
      return next(createError(403, "You can delete only your Post"));
    }
  } catch (error) {
    next(error);
  }
};

export const getAllPost = async (req, res, next) => {
  try {
    const post = await Post.find();
    res.status(200).json(post);
  } catch (error) {
    next(error);
  }
};

export const getPost = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id);
    res.status(200).json(post);
  } catch (error) {
    next(error);
  }
};

export const randomPost = async (req, res, next) => {
  try {
    const Post = await Post.aggregate([{ $sample: { size: 15 } }]);
    res.status(200).json(Post);
  } catch (error) {
    next(error);
  }
};

export const likePost = async (req, res, next) => {
  try {
    const { postId, userId } = req.body;

    const post = await Post.findById(postId);
    if (post.likes.includes(userId)) {
      await post.updateOne({ $pull: { likes: userId } });
      res.status(200).json({
        message: "User unlike the post",
      });
    } else {
      await post.updateOne({ $push: { likes: userId } });
      res.status(200).json({
        message: "You likes the post",
      });
    }
  } catch (error) {
    next(error);
  }
};

export const getPostByUserId = async (req, res, next) => {
  try {
    const post = await Post.find({ userId: req.params.id });
    res.status(200).json(post);
  } catch (error) {
    next(error);
  }
};
