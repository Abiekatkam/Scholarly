import express from "express";
import {
  addPost,
  updatePost,
  deletePost,
  getPost,
  getAllPost,
  randomPost,
  likePost,
  getPostByUserId,
} from "../controllers/PostController.js";

const router = express.Router();

// creata a video
router.post("/", addPost);
// get all video
router.get("/", getAllPost);
// update a video
router.put("/:id", updatePost);
// delete a video
router.delete("/:id", deletePost);
// get a video
router.get("/find/:id", getPost);
router.get("/user/:id", getPostByUserId);
// rendom
router.get("/random", randomPost);
// Likes
router.post("/likes", likePost);

export default router;
