import mongoose from "mongoose";

const AdminUserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  fullname: {
    type: String,
    required: true,
    trim: true,
  },
  role: {
    type: String,
    required: true,
    enum: ["admin", "moderator"],
    default: "moderator",
  },
  status: {
    type: Boolean,
    required: true,
    default: false,
  },
  password: {
    type: String,
    required: true,
  },
  signature: {
    public_id: String,
    secure_url: String,
  },
});

export default mongoose.model("AdminUser", AdminUserSchema);
