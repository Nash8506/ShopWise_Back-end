import express from "express";
import { signUpUser, loginUser } from "../controllers/userController.js";

const router = express.Router();

// Route to sign up a new user
router.post("/signup", signUpUser);

// Route to log in an existing user
router.post("/login", loginUser);

export default router;
