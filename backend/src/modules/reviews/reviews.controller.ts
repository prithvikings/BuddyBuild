import { Request, Response, NextFunction } from "express";
import { db } from "../../config/database";
import { addReviewJob } from "../../queues/review.queue";

export class ReviewsController {
  // POST /api/reviews
  static async submitReview(req: Request, res: Response, next: NextFunction) {
    const client = await db.getClient();

    try {
      const { code, language, personaKey } = req.body;
      const userId = (req as any).user?.id;

      // 1. INPUT VALIDATION
      if (!code || code.length < 10) {
        return res.status(400).json({ error: "Code snippet too short" });
      }
      if (code.length > 50000) {
        return res
          .status(400)
          .json({ error: "Code snippet exceeds 50KB limit" });
      }
      if (!personaKey) {
        return res.status(400).json({ error: "Persona Key is required" });
      }

      // 2. RESOLVE PERSONA VERSION
      // FIX: Changed 'is_current' to 'is_active' to match your DB schema
      const versionResult = await client.query(
        `
        SELECT pv.id as version_id 
        FROM personas p
        JOIN persona_prompt_versions pv ON p.id = pv.persona_id
        WHERE p.key = $1 AND pv.is_active = TRUE
        ORDER BY pv.version_number DESC
        LIMIT 1
      `,
        [personaKey],
      );

      if (versionResult.rows.length === 0) {
        console.error(`[Review] Persona not found: ${personaKey}`);
        return res
          .status(404)
          .json({ error: "Invalid Persona or System Misconfiguration" });
      }

      const versionId = versionResult.rows[0].version_id;

      // 3. TRANSACTION: CREATE INTENT
      await client.query("BEGIN");

      const insertResult = await client.query(
        `
        INSERT INTO code_reviews 
        (user_id, persona_version_id, code_snippet, language, file_name, status)
        VALUES ($1, $2, $3, $4, $5, 'PENDING')
        RETURNING id
      `,
        [
          userId || null,
          versionId,
          code,
          language || "plaintext",
          "snippet.txt",
        ],
      );

      const reviewId = insertResult.rows[0].id;

      // 4. HANDOFF TO QUEUE
      await addReviewJob(reviewId);

      await client.query("COMMIT");

      // 5. RESPONSE
      res.status(202).json({
        message: "Review queued successfully",
        reviewId: reviewId,
        status: "PENDING",
        statusUrl: `/api/reviews/${reviewId}`,
      });
    } catch (error) {
      await client.query("ROLLBACK");
      next(error);
    } finally {
      client.release();
    }
  }

  // GET /api/reviews/:id (Keep this as is)
  static async getReviewStatus(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const { id } = req.params;

      const reviewResult = await db.query(
        `
        SELECT 
          r.id, r.status, r.calculated_score, r.summary, r.created_at,
          r.code_snippet,
          json_agg(ri.*) FILTER (WHERE ri.id IS NOT NULL) as issues
        FROM code_reviews r
        LEFT JOIN review_issues ri ON r.id = ri.review_id
        WHERE r.id = $1
        GROUP BY r.id
      `,
        [id],
      );

      if (reviewResult.rows.length === 0) {
        return res.status(404).json({ error: "Review not found" });
      }

      const review = reviewResult.rows[0];

      res.json({
        data: review,
      });
    } catch (error) {
      next(error);
    }
  }

  // GET /api/reviews/history
  static async getUserReviews(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = (req as any).user?.id;

      const result = await db.query(
        `
        SELECT 
          r.id, 
          r.status, 
          r.calculated_score, 
          r.language, 
          r.created_at,
          p.name as persona_name 
        FROM code_reviews r
        JOIN persona_prompt_versions pv ON r.persona_version_id = pv.id
        JOIN personas p ON pv.persona_id = p.id
        WHERE r.user_id = $1
        ORDER BY r.created_at DESC
        LIMIT 50
      `,
        [userId],
      );

      res.json({ data: result.rows });
    } catch (error) {
      next(error);
    }
  }
}
