import express from "express";
import { googleAuth, login, register } from "../controllers/authController.js";

const router = express.Router();

// CREATE A USER
router.post("/register", register);

// SIGN IN A USER
router.post("/login", login);

// GOOGLE AUTH
router.post("/google", googleAuth);

export default router;
