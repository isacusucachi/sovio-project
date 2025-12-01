import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import axios from "axios";
import cloudinary from "cloudinary";
import AdminUser from "../models/adminUser.model";
import { createAccessToken } from "../libs/jwt";
import { TOKEN_SECRET, RECAPTCHA_SECRET_KEY_V3 } from "../config.js";

export const createAdminUser = async (req, res) => {
  try {
    const { username, fullname, password, status } = req.body;
    const adminUserFound = await AdminUser.findOne({ username });

    if (adminUserFound)
      return res.status(400).json({
        message: [`El usuario "${adminUserFound.username}" ya está en uso.`],
      });

    let signature = {};

    if (req.file) {
      const signatureImg = await cloudinary.uploader.upload(req.file.path);

      const secure_url = signatureImg.secure_url;

      const public_id = signatureImg.public_id;
      signature = {
        secure_url: secure_url,
        public_id: public_id,
      };
    }
    const passwordHash = await bcrypt.hash(password, 10);

    const newAdminUser = new AdminUser({
      username,
      fullname,
      password: passwordHash,
      signature: signature,
      status,
    });

    await newAdminUser.save();

    res.status(200).json({
      message: ["user created successfully"],
    });
  } catch (error) {
    console.error("User creation error:", error);
    return res.status(500).json({ message: ["500 Internal Server Error"] });
  }
};

export const updateAdminUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { username, fullname, password, status } = req.body;

    // Buscar el usuario en la base de datos
    const adminUserFound = await AdminUser.findById(id);
    if (!adminUserFound)
      return res.status(404).json({ message: ["Usuario no encontrado."] });

    // Verificar si el nombre de usuario ya existe (excepto el del usuario actual)
    const adminUserFoundByUsername = await AdminUser.findOne({
      username: username,
      _id: { $ne: id }, // Excluir el usuario actual de la búsqueda
    });

    if (adminUserFoundByUsername)
      return res
        .status(400)
        .json({ message: ["Nombre de usuario no disponible"] });

    let signature = adminUserFound.signature; // Mantener la firma anterior por defecto

    // Si hay una nueva firma, actualizar en Cloudinary
    if (req.file) {
      if (adminUserFound.signature?.public_id) {
        await cloudinary.uploader.destroy(adminUserFound.signature.public_id);
      }
      const result = await cloudinary.uploader.upload(req.file.path);
      signature = {
        public_id: result.public_id,
        secure_url: result.secure_url,
      };
    }

    // Si no se envía un nuevo password, mantener el actual
    let passwordHash = adminUserFound.password;
    if (password && password.trim() !== "") {
      passwordHash = await bcrypt.hash(password, 10);
    }

    // Actualizar el usuario con los nuevos valores
    const updateAdminUser = await AdminUser.findByIdAndUpdate(
      id,
      { username, fullname, password: passwordHash, signature, status },
      { new: true }
    );

    res.status(200).json(updateAdminUser);
  } catch (error) {
    console.error("User updating error:", error);
    return res.status(500).json({ message: ["500 Internal Server Error"] });
  }
};

async function verifyRecaptcha(token) {
  try {
    const response = await axios.post(
      "https://www.google.com/recaptcha/api/siteverify",
      null,
      {
        params: {
          secret: RECAPTCHA_SECRET_KEY_V3,
          response: token,
        },
      }
    );

    const { success, score, action } = response.data;

    if (success && score >= 0.5 && action === "login") {
      return { success: true, score };
    }

    return { success: false, score: score || 0 };
  } catch (error) {
    console.error("Error verificando reCAPTCHA:", error);
    return { success: false, score: 0 };
  }
}
export const adminLogin = async (req, res) => {
  try {
    const { username, password, recaptchaToken } = req.body;

    // Verificar reCAPTCHA primero
    const recaptchaResult = await verifyRecaptcha(recaptchaToken);

    if (!recaptchaResult.success) {
      return res
        .status(400)
        .json({ success: false, message: ["Verificación de seguridad fallida. Por favor, inténtalo de nuevo."] });
    }
    const adminUserFound = await AdminUser.findOne({ username });

    if (!adminUserFound)
      return res.status(400).json({
        message: [`Credenciales inválidas.`],
      });

    const isMatch = await bcrypt.compare(password, adminUserFound.password);

    if (!isMatch) {
      return res.status(400).json({
        message: ["Credenciales inválidas"],
      });
    }

    if (!adminUserFound.status) {
      return res.status(400).json({
        message: ["Acceso denegado"],
      });
    }

    const token = await createAccessToken({
      id: adminUserFound._id,
      username: adminUserFound.username,
    });

    res.status(200).json({
      token,
      id: adminUserFound._id,
      username: adminUserFound.username,
      fullname: adminUserFound.fullname,
      role: adminUserFound.role,
    });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({ message: ["500 Internal Server Error"] });
  }
};

const getTokenFrom = (req) => {
  const authorization = req.get("authorization");
  if (authorization && authorization.startsWith("Bearer ")) {
    return authorization.replace("Bearer ", "");
  }
  return null;
};

export const verifyToken = async (req, res) => {
  const admin_access_token = getTokenFrom(req);
  if (!admin_access_token) return res.send(false);

  jwt.verify(admin_access_token, TOKEN_SECRET, async (error, user) => {
    if (error) {
      console.error("Error verifying admin_access_token:", error);
      return res.status(401).json({ message: "Token inválido" });
    }

    const adminUserFound = await AdminUser.findById(user.id);
    if (!adminUserFound) return res.sendStatus(401);

    return res.json({
      id: adminUserFound._id,
      username: adminUserFound.username,
      fullname: adminUserFound.fullname,
      role: adminUserFound.role,
    });
  });
};

export const getAdminUsers = async (req, res) => {
  const { page = 1, limit = 20 } = req.query;
  const skip = (page - 1) * limit;

  const total = await AdminUser.countDocuments({
    role: "moderator",
  });
  const adminUsersFound = await AdminUser.find({ role: "moderator" })
    .sort({ _id: -1 })
    .skip(skip)
    .limit(limit)
    .select("_id username fullname signature status");

  res.status(200).json({
    users: adminUsersFound,
    totalPages: Math.ceil(total / limit),
    currentPage: Number(page),
  });
};

export const getAdminUser = async (req, res) => {
  const adminUserFound = await AdminUser.findById({ _id: req.params.id });
  if (!adminUserFound)
    return res.status(404).json({ message: ["Usuario no encontrado."] });

  res.status(200).json({
    _id: adminUserFound._id,
    username: adminUserFound.username,
    fullname: adminUserFound.fullname,
    signature: adminUserFound.signature,
    status: adminUserFound.status,
  });
};

export const deleteAdminUser = async (req, res) => {
  try {
    const adminUserFound = await AdminUser.findById({ _id: req.params.id });
    if (!adminUserFound)
      return res.status(404).json({ message: ["Usuario no encontrado."] });

    if (adminUserFound.role === "admin") {
      return res
        .status(404)
        .json({ message: ["No se puede eliminar al admin"] });
    }

    if (adminUserFound.signature.public_id) {
      await cloudinary.uploader.destroy(adminUserFound.signature.public_id);
    }

    await AdminUser.findByIdAndDelete({ _id: req.params.id });
    res.sendStatus(204);
  } catch (error) {
    console.error("User deletion error:", error);
    return res.status(500).json({ message: ["500 Internal Server Error"] });
  }
};

export const logout = async (req, res) => {
  res.clearCookie("admin_access_token").status(200).json("Signout success!");
  return res.sendStatus(200);
};
