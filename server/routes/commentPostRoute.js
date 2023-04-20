import express from "express";
import {
  addComment,
  deleteComment,
  getComment,
} from "../controllers/commentPostController.js";

const router = express.Router();

router.post("/", addComment);
router.post("/delete", deleteComment);
router.get("/:postId", getComment);

export default router;
