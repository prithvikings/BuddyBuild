import { Worker, Job } from "bullmq";
import { redis } from "../config/redis";
import { db } from "../config/database";
import { AIFactory } from "../ai/ai.factory";
import { ReviewJobData, REVIEW_QUEUE_NAME } from "./review.queue";

// SCORING ALGORITHM (Deterministic)

// Start at 100. Deduct points based on severity.

const calculateScore = (issues: any[]): number => {
  let score = 100;

  issues.forEach((issue) => {
    switch (issue.severity) {
      case 5:
        score -= 20;
        break; // Critical

      case 4:
        score -= 10;
        break; // High

      case 3:
        score -= 5;
        break; // Medium

      case 2:
        score -= 2;
        break; // Low

      case 1:
        score -= 0;
        break; // Info
    }
  });

  return Math.max(0, score); // Floor at 0
};

const processReview = async (job: Job<ReviewJobData>) => {
  const { reviewId } = job.data;

  const client = await db.getClient(); // Transaction client

  try {
    console.log(`[Worker] Starting Review ${reviewId}`);

    // 1. Fetch Data & Lock Row

    // We need the Code AND the specific System Prompt version

    const result = await client.query(
      `

      SELECT r.code_snippet, pv.system_prompt_template 

      FROM code_reviews r

      JOIN persona_prompt_versions pv ON r.persona_version_id = pv.id

      WHERE r.id = $1

    `,
      [reviewId],
    );

    if (result.rows.length === 0) {
      throw new Error("Review not found in DB");
    }

    const { code_snippet, system_prompt_template } = result.rows[0];

    // 2. Mark as PROCESSING

    await client.query(
      `UPDATE code_reviews SET status = 'PROCESSING', updated_at = NOW() WHERE id = $1`,

      [reviewId],
    );

    // 3. Call AI Service

    // Note: This is the slow part (5-30 seconds)

    const provider = AIFactory.getProvider();

    const aiResponse = await provider.generateReview(
      code_snippet,
      system_prompt_template,
    );

    // 4. Calculate Score locally

    const finalScore = calculateScore(aiResponse.review.issues);

    // 5. Save Results Transactionally

    await client.query("BEGIN");

    // 5a. Update Main Review Record

    await client.query(
      `

      UPDATE code_reviews 

      SET 

        status = 'COMPLETED',

        calculated_score = $1,

        summary = $2,

        raw_ai_response = $3,

        tokens_used = $4,

        processing_time_ms = $5,

        updated_at = NOW()

      WHERE id = $6

    `,
      [
        finalScore,

        aiResponse.review.summary,

        JSON.stringify(aiResponse), // Store full raw data for audit

        aiResponse.metadata.tokens_used,

        aiResponse.metadata.latency_ms,

        reviewId,
      ],
    );

    // 5b. Insert Individual Issues (Batch Insert)

    if (aiResponse.review.issues.length > 0) {
      // Build dynamic value string ($1, $2...), ($7, $8...)...

      // For brevity in this snippet, we loop. In high-load, use pg-format or UNNEST.

      for (const issue of aiResponse.review.issues) {
        await client.query(
          `

          INSERT INTO review_issues 

          (review_id, category, severity, line_start, line_end, description, suggestion)

          VALUES ($1, $2, $3, $4, $5, $6, $7)

        `,
          [
            reviewId,

            issue.category,

            issue.severity,

            issue.line_start || 0,

            issue.line_end || 0,

            issue.description,

            issue.suggestion,
          ],
        );
      }
    }

    await client.query("COMMIT");

    console.log(`[Worker] Review ${reviewId} Completed. Score: ${finalScore}`);
  } catch (error: any) {
    await client.query("ROLLBACK");

    console.error(`[Worker] Failed Review ${reviewId}:`, error);

    // Mark DB as FAILED so UI shows error

    await db.query(
      `UPDATE code_reviews SET status = 'FAILED', error_message = $1 WHERE id = $2`,

      [error.message, reviewId],
    );

    throw error; // Throwing triggers BullMQ retry logic
  } finally {
    client.release();
  }
};

// Start the Worker

export const reviewWorker = new Worker(REVIEW_QUEUE_NAME, processReview, {
  connection: redis,

  concurrency: 5, // Process 5 reviews in parallel
});

reviewWorker.on("failed", (job, err) => {
  console.error(`[BullMQ] Job ${job?.id} failed permanently: ${err.message}`);
});
