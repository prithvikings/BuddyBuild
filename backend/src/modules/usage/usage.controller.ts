import { Request, Response } from "express";
import { reviewLimiter } from "../../config/rate-limiter";

export class UsageController {
  static async getLimits(req: Request, res: Response) {
    try {
      const userId = (req as any).user?.id;
      if (!userId) return res.status(401).json({ error: "Unauthorized" });

      // Check Redis without consuming points
      const resLimiter = await reviewLimiter.get(userId);

      const total = 10; // Must match config/rate-limiter.ts
      const consumed = resLimiter ? resLimiter.consumedPoints : 0;
      const remaining = Math.max(0, total - consumed);

      res.json({
        total,
        consumed,
        remaining,
      });
    } catch (error) {
      console.error("[Usage] Error fetching limits:", error);
      res.status(500).json({ error: "Failed to fetch usage" });
    }
  }
}
