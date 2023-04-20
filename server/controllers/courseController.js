import Course from "../models/Course.js";
import User from "../models/User.js";

export const addCourse = async (req, res, next) => {
  console.log(req.body);
  const newCourse = new Course({ ...req.body });
  try {
    const savedCourse = await newCourse.save();
    res.status(200).json(savedCourse);
  } catch (error) {
    next(error);
  }
};

export const updateCourse = async (req, res, next) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) return next(createError(404, "Course not found"));

    if (course.userId === req.user.id) {
      const updatedCourse = await Course.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        {
          new: true,
        }
      );
      res.status(200).json({
        message: "Course updated successfully",
        course: updatedCourse,
      });
    } else {
      return next(createError(403, "You can update only your course"));
    }
  } catch (error) {
    next(error);
  }
};

export const deleteCourse = async (req, res, next) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) return next(createError(404, "Course not found"));

    if (course.userId === req.user.id) {
      await Course.findByIdAndDelete(req.params.id);
      res.status(200).json({
        message: "Course deleted successfully",
      });
    } else {
      return next(createError(403, "You can delete only your course"));
    }
  } catch (error) {
    next(error);
  }
};

export const getCourse = async (req, res, next) => {
  try {
    const course = await Course.findById(req.params.id);
    res.status(200).json(course);
  } catch (error) {
    next(error);
  }
};

// get course by userid
export const getCourseByUser = async (req, res, next) => {
  try {
    const course = await Course.find({ userId: req.params.id });
    res.status(200).json(course);
  } catch (error) {
    next(error);
  }
};

export const addViewCourse = async (req, res, next) => {
  try {
    await Course.findByIdAndUpdate(req.params.id, {
      $inc: { views: 1 },
    });
    res.status(200).json("Course has been viewed");
  } catch (error) {
    next(error);
  }
};

export const trendCourse = async (req, res, next) => {
  try {
    const course = await Course.find().sort({ views: -1 });
    res.status(200).json(course);
  } catch (error) {
    next(error);
  }
};

export const randomCourse = async (req, res, next) => {
  try {
    const course = await Course.aggregate([{ $sample: { size: 15 } }]);
    res.status(200).json(course);
  } catch (error) {
    next(error);
  }
};

export const wishlistCourse = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    const wishlistCourse = user.wishlist;

    const list = await Promise.all(
      wishlistCourse.map(async (courseId) => {
        return Course.find({ _id: courseId });
      })
    );

    res.status(200).json(list.flat().sort((a, b) => b.createdAt - a.createdAt));
  } catch (error) {
    next(error);
  }
};

export const getCourseByType = async (req, res, next) => {
  const type = req.body.type;
  try {
    const course = await Course.find({ videoType: type }).limit(20);
    res.status(200).json(course);
  } catch (error) {
    next(error);
  }
};

export const getCourseBySearch = async (req, res, next) => {
  const query = req.query.q;
  try {
    const course = await Course.find({
      title: { $regex: query, $options: "i" },
    }).limit(40);
    res.status(200).json(course);
  } catch (error) {
    next(error);
  }
};
