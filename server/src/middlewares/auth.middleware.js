import jwt from "jsonwebtoken";
import { TOKEN_SECRET } from "../config.js";
import adminUser from "../models/adminUser.model.js";

const getTokenFrom = (req) => {
  const authorization = req.get("authorization");
  if (authorization && authorization.startsWith("Bearer ")) {
    return authorization.replace("Bearer ", "");
  }
  return null;
};

export const auth = (req, res, next) => {
  try {
    const access_token = getTokenFrom(req);

    if (!access_token)
      return res
        .status(401)
        .json({ message: "Token no recibido, autorización denegada" });

    jwt.verify(access_token, TOKEN_SECRET, (error, user) => {
      if (error) {
        return res.status(401).json({ message: "Token no válido" });
      }
      req.user = user;
      next();
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const authAdmin = (req, res, next) => {
  try {
    const admin_access_token = getTokenFrom(req);
    if (!admin_access_token)
      return res
        .status(401)
        .json({ message: "Token no recibido, autorización denegada" });

    jwt.verify(admin_access_token, TOKEN_SECRET, (error, adminUser) => {
      if (error) {
        return res.status(401).json({ message: "Token no válido" });
      }
      req.adminUser = adminUser;
      next();
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const isAdmin = async (req, res, next) => {
  try {
    const adminUserFound = await adminUser.findById(req.adminUser.id);

    if (adminUserFound.role === "admin") {
      next();
      return;
    }
    return res.status(403).json({ message: ["Require Admin Role!"] });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
