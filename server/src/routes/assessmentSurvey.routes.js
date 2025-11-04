import { Router } from "express";
import { validateSchema } from "../middlewares/validator.middleware.js";
import { assessmentSurveySchema } from "../schemas/assessmentSurvey.schema.js";
import { auth } from "../middlewares/auth.middleware.js";
import { createAssessmentSurvey } from "../controllers/assessmentSurvey.controller.js";

const router = Router();

router.post(
  "/",
  auth,
  validateSchema(assessmentSurveySchema),
  createAssessmentSurvey
);

export default router;
