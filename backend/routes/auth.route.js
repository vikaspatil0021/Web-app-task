import { Router } from "express";

import { authenticate } from "../middlewares/auth.middleware.js";

import {
  registerUser,
  loginUser,
  logoutUser,
} from "../controllers/auth.controller.js";

const router = Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", authenticate, logoutUser);

export default router;
