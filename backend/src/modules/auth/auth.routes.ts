import { Router } from "express";
import passport from "passport";
import { AuthController } from "./auth.controller";
import { authMiddleware } from "../../middlewares/auth.middleware"; // We build this next
import { limitAuth } from "../../middlewares/rate-limit.middleware";

const router = Router();

// 1. Start Login (Redirects to Google)
router.get(
  "/google",
  limitAuth,
  passport.authenticate("google", {
    scope: ["profile", "email"],
    session: false,
  }),
);

// 2. Google Returns Here
router.get(
  "/google/callback",
  passport.authenticate("google", {
    session: false,
    failureRedirect: "/login",
  }),
  AuthController.googleCallback,
);

// 3. Status & Logout
router.get("/me", authMiddleware, AuthController.getMe);
router.post("/logout", AuthController.logout);

export default router;
