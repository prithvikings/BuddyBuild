import { Router } from "express";
import { ReviewsController } from "./reviews.controller";
import { authMiddleware } from "../../middlewares/auth.middleware";
import { limitReviews } from "../../middlewares/rate-limit.middleware"; // <--- Import

const router = Router();

// Chain: Auth -> Rate Limit -> Controller
router.post("/", authMiddleware, limitReviews, ReviewsController.submitReview);

router.get("/history", authMiddleware, ReviewsController.getUserReviews);

// 3. Single Status
router.get("/:id", authMiddleware, ReviewsController.getReviewStatus);

export default router;
