import { Router } from "express";

import { auth, authAdmin } from "../middlewares/auth.middleware.js";
import {
  createPersonalInformation,
  getUserInformation,
} from "../controllers/user.controller.js";
import { validateSchema } from "../middlewares/validator.middleware.js";
import { personalInformationSchema } from "../schemas/personalInformation.schema.js";

const router = Router();

router.post(
  "/personal-information",
  auth,
  validateSchema(personalInformationSchema),
  createPersonalInformation
);

router.get("/user-information/:id", authAdmin, getUserInformation);

export default router;
