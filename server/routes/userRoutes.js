import express from "express";
import {
  deleteUser,
  followUser,
  getAllUser,
  getUser,
  updateUser,
  wishlist,
} from "../controllers/userController.js";
import { verifyToken } from "../verifyToken.js";

const router = express.Router();

// UPDATA A USER
router.put("/:id", updateUser);

// DELETE A USER
router.delete("/:id", verifyToken, deleteUser);

// GET A USER
router.get("/find/:id", getUser);

// GET ALL USERS
router.get("/getalluser", getAllUser);

// WISHLIST
router.post("/wishlist", wishlist);

// FOLLOW
router.post("/follow", followUser);

export default router;
