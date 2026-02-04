import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import helmet from "helmet";
import cookieParser from "cookie-parser"; // <--- NEW
import passport from "passport"; // <--- NEW

import { config } from "./config/env";
import "./config/passport"; // <--- LOAD STRATEGY
import reviewsRoutes from "./modules/reviews/reviews.routes";
import authRoutes from "./modules/auth/auth.routes"; // <--- NEW
import usageRoutes from "./modules/usage/usage.routes";

const app = express();

// Middleware
app.use(helmet());
app.use(cookieParser()); // <--- NEW: Read cookies
app.use(express.json({ limit: "100kb" }));

// CORS (Updated for Credentials)
app.use(
  cors({
    origin: config.CLIENT_URL, // e.g., 'http://localhost:5173'
    credentials: true, // <--- CRITICAL: Allow Cookies
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  }),
);

// Initialize Passport
app.use(passport.initialize());

// Routes
app.use("/api/auth", authRoutes); // <--- MOUNT AUTH
app.use("/api/reviews", reviewsRoutes); // Note: You should add authMiddleware inside reviewsRoutes later
app.use("/api/usage", usageRoutes);
// Health Check
app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});

// Error Handler... (Keep existing)
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error("[Unhandled Error]", err.stack);
  res.status(500).json({
    error: "Internal Server Error",
    message: config.NODE_ENV === "development" ? err.message : undefined,
  });
});

export default app;
