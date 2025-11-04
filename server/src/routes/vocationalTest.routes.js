import { Router } from "express";
import {
  createUpdateIeppoTest,
  finishIeppoTest,
  generateIeppoTestResult,
  getIeppoTest,
  getIeppoTests,
  resetIeppoTest,
} from "../controllers/ieppoTest.controller.js";
import {
  createUpdatePhbTest,
  finishPhbTest,
  generatePhbTestResult,
  getPhbTest,
  getPhbTests,
  resetPhbTest,
} from "../controllers/phbTest.controller.js";
import {
  createUpdateTepeTest,
  finishTepeTest,
  generateTepeTestResult,
  getTepeTest,
  getTepeTests,
  resetTepeTest,
} from "../controllers/tepeTest.controller.js";

import {
  evaluateTestReport,
  getCareersByUsersAndEvaluationDate,
  getEvaluatedVocationalTestReports_Admin,
  getReports_Admin,
  getVocationalTestReport,
  getVocationalTestReport_Admin,
  getVocationalTestReports_Admin,
} from "../controllers/finalTestReport.controller.js";

import { auth, authAdmin } from "../middlewares/auth.middleware.js";

const router = Router();

router.post("/ieppo-test", auth, createUpdateIeppoTest);
router.post("/ieppo-test/finish", auth, finishIeppoTest);
router.post("/ieppo-test/result", auth, generateIeppoTestResult);
router.get("/ieppo-test", auth, getIeppoTest);
router.put("/ieppo-test/reset", auth, resetIeppoTest);
router.get("/ieppo-tests", auth, getIeppoTests);

router.post("/phb-test", auth, createUpdatePhbTest);
router.post("/phb-test/finish", auth, finishPhbTest);
router.post("/phb-test/result", auth, generatePhbTestResult);
router.get("/phb-test", auth, getPhbTest);
router.put("/phb-test/reset", auth, resetPhbTest);
router.get("/phb-tests", auth, getPhbTests);

router.post("/tepe-test", auth, createUpdateTepeTest);
router.post("/tepe-test/finish", auth, finishTepeTest);
router.post("/tepe-test/result", auth, generateTepeTestResult);
router.get("/tepe-test", auth, getTepeTest);
router.put("/tepe-test/reset", auth, resetTepeTest);
router.get("/tepe-tests", auth, getTepeTests);

router.get("/vocational-test-report", auth, getVocationalTestReport);
router.get("/reports", authAdmin, getVocationalTestReports_Admin);
router.get(
  "/evaluated-reports",
  authAdmin,
  getEvaluatedVocationalTestReports_Admin
);
router.get("/reports/:id", authAdmin, getVocationalTestReport_Admin);
router.put("/reports/:id", authAdmin, evaluateTestReport);
router.get("/careers-reports", getCareersByUsersAndEvaluationDate);
router.get("/final-report",authAdmin, getReports_Admin);

export default router;
