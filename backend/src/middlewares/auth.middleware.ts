import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { config } from "../config/env";

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  // 1. Read Token from Cookie
  const token = req.cookies?.token;

  if (!token) {
    // If checking status (/me), return 401. If protecting API, also 401.
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    // 2. Verify Token
    const decoded = jwt.verify(token, config.JWT_SECRET);
    (req as any).user = decoded; // Attach user ID to request
    next();
  } catch (error) {
    console.error("[Auth] Invalid Token");
    res.clearCookie("token"); // Clear bad token
    return res.status(401).json({ error: "Invalid Session" });
  }
};
