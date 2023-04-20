import express from "express";
import { verifyToken } from "../verifyToken.js";
import {
  addComment,
  deleteComment,
  getComment,
} from "../controllers/commentController.js";

const router = express.Router();

router.post("/", addComment);
router.post("/delete", deleteComment);
router.get("/:videoId", getComment);

export default router;
