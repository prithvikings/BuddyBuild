import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { config } from "../../config/env";

export class AuthController {
  // 1. Google Callback Handler
  static async googleCallback(req: Request, res: Response) {
    try {
      // Passport attaches the user to req.user
      const user = req.user as any;

      if (!user) {
        return res.redirect(`${config.CLIENT_URL}/login?error=auth_failed`);
      }

      // Generate JWT
      const token = jwt.sign(
        { id: user.id, email: user.email, role: "user" },
        config.JWT_SECRET,
        { expiresIn: "7d" }, // Session lasts 7 days
      );

      // Set HttpOnly Cookie (Browser cannot access this via JS)
      res.cookie("token", token, {
        httpOnly: true,
        secure: config.NODE_ENV === "production", // HTTPS only in prod
        sameSite: "lax", // vital for OAuth redirects
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      });

      // Redirect back to Frontend
      res.redirect(config.CLIENT_URL);
    } catch (error) {
      console.error("Auth Error:", error);
      res.redirect(`${config.CLIENT_URL}/login?error=server_error`);
    }
  }

  // 2. Logout
  static logout(req: Request, res: Response) {
    res.clearCookie("token");
    res.json({ message: "Logged out" });
  }

  // 3. Get Current User (Frontend calls this on load)
  static async getMe(req: Request, res: Response) {
    // The auth middleware (we build next) puts user here
    const user = (req as any).user;

    if (!user) {
      return res.status(401).json({ authenticated: false });
    }

    res.json({
      authenticated: true,
      user: {
        id: user.id,
        email: user.email,
        full_name: user.full_name,
        avatar_url: user.avatar_url,
      },
    });
  }
}
