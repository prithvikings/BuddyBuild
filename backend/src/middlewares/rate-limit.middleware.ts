import { Request, Response, NextFunction } from "express";
import { RateLimiterRedis } from "rate-limiter-flexible";
import { reviewLimiter, authLimiter } from "../config/rate-limiter";

const makeMiddleware = (limiter: RateLimiterRedis, type: string) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      // 1. Identify the user
      // If logged in, use User ID. If guest (login page), use IP address.
      const userId = (req as any).user?.id;
      const key = userId ? userId : req.ip;

      if (!key) {
        // Fallback for safety
        return res
          .status(400)
          .json({ error: "Identification failed for rate limiting" });
      }

      // 2. Consume 1 point
      await limiter.consume(key, 1);

      next();
    } catch (rejRes) {
      // 3. Reject if limit exceeded
      console.warn(`[RateLimit] ${type} limit exceeded for ${req.ip}`);

      res.status(429).json({
        error: "Too Many Requests",
        message: `You have exceeded your ${type} limit. Please try again later.`,
      });
    }
  };
};

export const limitReviews = makeMiddleware(reviewLimiter, "review");
export const limitAuth = makeMiddleware(authLimiter, "auth");
