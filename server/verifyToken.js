import jwt from "jsonwebtoken";
import { createError } from "./error.js";

export const verifyToken = (req, res, next) => {
  const token = req.cookies.accesstoken;
  console.log(req.cookies.accesstoken);
  if (!token) return next(createError(401, "You are not authenticated!"));

  try {
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) return next(createError(403, "Token is not valid!"));
      req.user = user;
      next();
    });
  } catch (error) {
    next(error);
  }
};
