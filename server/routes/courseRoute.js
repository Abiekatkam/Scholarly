import express from "express";
import { verifyToken } from "../verifyToken.js";
import {
  addCourse,
  addViewCourse,
  deleteCourse,
  getCourse,
  getCourseBySearch,
  getCourseByType,
  getCourseByUser,
  randomCourse,
  trendCourse,
  updateCourse,
  wishlistCourse,
} from "../controllers/courseController.js";

const router = express.Router();

// creata a video
router.post("/", addCourse);
// update a video
router.put("/:id", verifyToken, updateCourse);
// delete a video
router.delete("/:id", verifyToken, deleteCourse);
// get a video
router.get("/find/:id", getCourse);
// get a video by userid
router.get("/user/:id", getCourseByUser);
// increase a star count
router.put("/view/:id", addViewCourse);
// trending videos
router.get("/trend", trendCourse);
// rendom
router.get("/random", randomCourse);
// stared courses
router.get("/wishlist", verifyToken, wishlistCourse);
// get course by it type
router.post("/type", getCourseByType);
// get course by it search
router.get("/search", getCourseBySearch);

export default router;
