import { Router } from "express";
const router = Router();
import {
  signUp,
  signIn,
  logout,
  checkAuth,
} from "../controllers/auth.controller.js";
import { protectedRoute } from "../middlewares/auth.middleware.js";

router.post("/signup", signUp);

router.post("/signin", signIn);

router.post("/logout", logout);

router.get("/check", protectedRoute, checkAuth);

export default router;
