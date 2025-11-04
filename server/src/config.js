export const PORT = process.env.PORT || 4000;
export const MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://localhost:27017/sovio-db";
export const TOKEN_SECRET = process.env.TOKEN_SECRET || "yoursecret";

export const ADMIN_USERNAME = process.env.ADMIN_USERNAME;
export const ADMIN_FULLNAME = process.env.ADMIN_FULLNAME;
export const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

export const CLOUDINARY_CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME;
export const CLOUDINARY_API_KEY = process.env.CLOUDINARY_API_KEY;
export const CLOUDINARY_API_SECRET = process.env.CLOUDINARY_API_SECRET;

export const NOTIFICATION_EMAIL_USER = process.env.NOTIFICATION_EMAIL_USER;
export const NOTIFICATION_EMAIL_PASSWORD =
  process.env.NOTIFICATION_EMAIL_PASSWORD;

export const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:5173";
export const ADMIN_FRONTEND_URL = process.env.ADMIN_FRONTEND_URL || "http://localhost:5174";
export const DOMAIN = process.env.DOMAIN || "localhost";

export const RECAPTCHA_SECRET_KEY_V3 = process.env.RECAPTCHA_SECRET_KEY_V3;
export const RECAPTCHA_SECRET_KEY_V2 = process.env.RECAPTCHA_SECRET_KEY_V2;