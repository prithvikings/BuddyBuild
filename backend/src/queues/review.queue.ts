import { Queue } from 'bullmq';
import { redis } from '../config/redis';

// Name of the queue in Redis
export const REVIEW_QUEUE_NAME = 'code-review-queue';

// Define the shape of data inside the job
export interface ReviewJobData {
  reviewId: string; // We only pass the ID. The worker fetches the rest.
}

// Initialize the Queue
export const reviewQueue = new Queue<ReviewJobData>(REVIEW_QUEUE_NAME, {
  connection: redis,
  defaultJobOptions: {
    attempts: 3, // Retry failed jobs 3 times
    backoff: {
      type: 'exponential',
      delay: 1000, // Wait 1s, then 2s, then 4s
    },
    removeOnComplete: true, // Auto-cleanup success jobs (save Redis memory)
    removeOnFail: false, // Keep failed jobs for debugging
  },
});

// Helper to add jobs securely
export const addReviewJob = async (reviewId: string) => {
  await reviewQueue.add('analyze-code', { reviewId });
  console.log(`[Queue] Added job for Review ID: ${reviewId}`);
};