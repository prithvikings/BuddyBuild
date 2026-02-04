import { Router } from "express";
import { UsageController } from "./usage.controller";
import { authMiddleware } from "../../middlewares/auth.middleware";

const router = Router();

router.get("/limits", authMiddleware, UsageController.getLimits);

export default router;
