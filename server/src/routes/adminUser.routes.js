import { Router } from "express";
import {
  adminLogin,
  logout,
  verifyToken,
  createAdminUser,
  updateAdminUser,
  getAdminUsers,
  getAdminUser,
  deleteAdminUser,
} from "../controllers/adminUser.controller.js";
import { validateSchema } from "../middlewares/validator.middleware.js";
import { adminLoginSchema } from "../schemas/adminAuth.schema.js";
import {
  adminUserSchema,
  updateAdminUserSchema,
} from "../schemas/adminUsers.schema.js";
import { isAdmin, authAdmin } from "../middlewares/auth.middleware.js";
import upload from "../middlewares/upload.middleware.js";

const router = Router();

router.post("/login", validateSchema(adminLoginSchema), adminLogin);
router.get("/verify", verifyToken);
router.post("/logout", authAdmin, logout);

router.get("/get-admin-users", [authAdmin, isAdmin], getAdminUsers);
router.get("/get-admin-user/:id", authAdmin, getAdminUser);

router.post(
  "/create-admin-user",
  [authAdmin, isAdmin],
  upload.single("image"),
  validateSchema(adminUserSchema),
  createAdminUser
);

router.put(
  "/update-admin-user/:id",
  [authAdmin, isAdmin],
  upload.single("image"),
  validateSchema(updateAdminUserSchema),
  updateAdminUser
);

router.delete("/delete-admin-user/:id", [authAdmin, isAdmin], deleteAdminUser);

export default router;
