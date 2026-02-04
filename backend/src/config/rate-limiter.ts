import { RateLimiterRedis } from "rate-limiter-flexible";
import { redis } from "./redis"; // Re-use your existing connection

// Rule: 10 Reviews per Hour per User
export const reviewLimiter = new RateLimiterRedis({
  storeClient: redis,
  keyPrefix: "limit_review",
  points: 10, // Number of reviews
  duration: 3600, // Per 3600 seconds (1 Hour)
  blockDuration: 60 * 15, // Block for 15 mins if they abuse it
});

// Rule: 20 Auth attempts per Minute (Brute force protection)
export const authLimiter = new RateLimiterRedis({
  storeClient: redis,
  keyPrefix: "limit_auth",
  points: 20,
  duration: 60,
});
