import { createError } from "../error.js";
import User from "../models/User.js";

export const updateUser = async (req, res, next) => {
  const { userId } = req.body;
  if (req.params.id === userId) {
    try {
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        {
          new: true,
        }
      );
      res.status(200).json({
        message: "User credentials updated successfully",
        cred: updatedUser,
      });
    } catch (error) {}
  } else {
    return next(createError(403, "You can update only your account"));
  }
};

export const deleteUser = async (req, res, next) => {
  if (req.parms.id === req.user.id) {
    try {
      await User.findByIdAndDelete(req.params.id);
      res.status(200).json({
        message: "User credentials deleted successfully",
      });
    } catch (error) {}
  } else {
    return next(createError(403, "You can delete only your account"));
  }
};

export const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

export const getAllUser = async (req, res, next) => {
  try {
    const users = await User.find({});
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};

export const wishlist = async (req, res, next) => {
  try {
    const { courseId, userId } = req.body;

    const user = await User.findById(userId);
    if (user.wishlist.includes(courseId)) {
      await user.updateOne({ $pull: { wishlist: courseId } });
      res.status(200).json({
        message: "Product removed from wishlist",
      });
    } else {
      await user.updateOne({ $push: { wishlist: courseId } });
      res.status(200).json({
        message: "Product added to wishlist",
      });
    }
  } catch (error) {
    next(error);
  }
};

export const followUser = async (req, res, next) => {
  try {
    const { userId, anonymousId } = req.body;
    const user = await User.findById(userId);
    const anonymous = await User.findById(anonymousId);

    if (user.following.includes(anonymousId)) {
      await user.updateOne({ $pull: { following: anonymousId } });
      await anonymous.updateOne({ $pull: { follower: userId } });
      res.status(200).json({
        message: "You unfollowed this user",
      });
    } else {
      await user.updateOne({ $push: { following: anonymousId } });
      await anonymous.updateOne({ $push: { follower: userId } });
      res.status(200).json({
        message: "You followed this user",
      });
    }
  } catch (error) {
    next(error);
  }
};
