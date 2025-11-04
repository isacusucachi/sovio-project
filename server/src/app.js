import express from "express";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import cloudinary from "cloudinary";

import {
  FRONTEND_URL,
  ADMIN_FRONTEND_URL,
  CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET,
  CLOUDINARY_CLOUD_NAME,
} from "./config.js";

// Routes
import authRoutes from "./routes/auth.routes.js";
import adminUserRoutes from "./routes/adminUser.routes";
import userRoutes from "./routes/user.routes.js";
const educationalServiceRoutes = require("./routes/educationalService.routes.js");
import vocationalTestRoutes from "./routes/vocationalTest.routes.js";
import assessmentSurveyRoutes from "./routes/assessmentSurvey.routes.js";

const app = express();

// Middlewares
app.use(
  cors({
    origin: [FRONTEND_URL, ADMIN_FRONTEND_URL],
    credentials: true,
  })
);

app.use(helmet());
app.use(express.json());
app.use(morgan("dev"));
app.use(cookieParser());

cloudinary.config({
  cloud_name: CLOUDINARY_CLOUD_NAME,
  api_key: CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_API_SECRET,
});

// Api routes
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminUserRoutes);
app.use("/api/user", userRoutes);
app.use("/api/educational-service", educationalServiceRoutes);
app.use("/api/vocational-test", vocationalTestRoutes);
app.use("/api/assessment-survey", assessmentSurveyRoutes);

export default app;
