import { Router } from "express";
import {
  getDashboardMetrics,
  getUsersHistory,
  getSatisfactionData,
  getNavigationDifficultyData,
  getTestsDistribution,
  getComments,
  getAllDashboardData,
} from "../controllers/dashboard.controller.js";
import { authAdmin } from "../middlewares/auth.middleware.js";

const router = Router();

router.get("/metrics", authAdmin, getDashboardMetrics);
router.get("/users-history", authAdmin, getUsersHistory);
router.get("/satisfaction", authAdmin, getSatisfactionData);
router.get("/navigation-difficulty", authAdmin, getNavigationDifficultyData);
router.get("/tests-distribution", authAdmin, getTestsDistribution);
router.get("/comments", authAdmin, getComments);
router.get("/all", authAdmin, getAllDashboardData);

export default router;
