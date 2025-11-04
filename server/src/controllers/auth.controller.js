import User from "../models/user.model.js";
import axios from "axios";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

import { TOKEN_SECRET, RECAPTCHA_SECRET_KEY_V3 } from "../config.js";

import { createAccessToken } from "../libs/jwt.js";
import FinalTestReport from "../models/finalTestReport.model.js";
import EducationalService from "../models/educationalService.model.js";

const calcularEdad = (fechaNacimiento) => {
  const hoy = new Date();
  const nacimiento = new Date(fechaNacimiento);
  let edad = hoy.getFullYear() - nacimiento.getFullYear();
  const mes = hoy.getMonth() - nacimiento.getMonth();
  if (mes < 0 || (mes === 0 && hoy.getDate() < nacimiento.getDate())) {
    edad--;
  }
  return edad;
};

export const register = async (req, res) => {
  try {
    const {
      typeOfIdentityDocument,
      identityDocumentNumber,
      nationality,
      names,
      surnames,
      birthdate,
      gender,
      height,
      email,
      phoneNumber,
      password,
      termsAndConditions,
      educationalService,
      grade_section_cycle,
      recaptchaToken,
    } = req.body;

    const response = await axios.post(
      `https://www.google.com/recaptcha/api/siteverify`,
      null,
      {
        params: {
          secret: RECAPTCHA_SECRET_KEY_V3,
          response: recaptchaToken,
        },
      }
    );

    const { success, score } = response.data;

    if (!success) {
      return res.status(400).json({
        message: ["No se pudo verificar que no eres un robot"],
      });
    }

    if (score <= 0.5) {
      return res.status(400).json({
        message: ["No se pudo verificar que no eres un robot"],
      });
    }

    const userFound = await User.findOne({ identityDocumentNumber });

    if (userFound)
      return res.status(400).json({
        message: [
          `El documento "${identityDocumentNumber}" ya está registrado.`,
        ],
      });

    const verifyEmail = await User.findOne({ email });

    if (verifyEmail)
      return res.status(400).json({
        message: [`El correo "${email}" ya está en uso.`],
      });

    const verifyEducationalService = await EducationalService.findById(
      educationalService
    );

    if (!verifyEducationalService)
      return res.status(400).json({
        message: [`Servicio Educativo no encontrado.`],
      });

    if (termsAndConditions != true)
      return res.status(400).json({
        message: ["Debe aceptar los términos y condiciones de uso."],
      });

    const age = calcularEdad(birthdate);
    const passwordHash = await bcrypt.hash(password, 10);

    const newUser = new User({
      typeOfIdentityDocument,
      identityDocumentNumber,
      nationality,
      names,
      surnames,
      birthdate,
      age,
      gender,
      height,
      email,
      phoneNumber,
      password: passwordHash,
      termsAndConditions,
      educationalService,
      grade_section_cycle,
    });

    const userSaved = await newUser.save();

    const newFinalTestReport = new FinalTestReport({
      userId: userSaved._id,
    });

    await newFinalTestReport.save();

    const token = await createAccessToken({
      id: userSaved._id,
    });

    res.status(200).json({
      token,
      id: userSaved._id,
      typeOfIdentityDocument: userSaved.typeOfIdentityDocument,
      identityDocumentNumber: userSaved.identityDocumentNumber,
      names: userSaved.names,
      surnames: userSaved.surnames,
      age: userSaved.age,
      gender: userSaved.gender,
      email: userSaved.email,
      phoneNumber: userSaved.phoneNumber,
      completedUserInformation: userSaved.completedUserInformation,
      completedIeppoTest: userSaved.completedIeppoTest,
      completedPhbTest: userSaved.completedPhbTest,
      completedTepeTest: userSaved.completedTepeTest,
      completedAssessmentSurvey: userSaved.completedAssessmentSurvey,
    });
  } catch (error) {
    console.error("Registration error:", error);
    return res.status(500).json({ message: ["500 Internal Server Error"] });
  }
};

export const login = async (req, res) => {
  try {
    const { identifier, password, recaptchaToken } = req.body;

    const response = await axios.post(
      `https://www.google.com/recaptcha/api/siteverify`,
      null,
      {
        params: {
          secret: RECAPTCHA_SECRET_KEY_V3,
          response: recaptchaToken,
        },
      }
    );
    const { success, score } = response.data;
    if (!success) {
      return res.status(400).json({
        message: ["No se pudo verificar que no eres un robot"],
      });
    }

    if (score <= 0.5) {
      return res.status(400).json({
        message: ["No se pudo verificar que no eres un robot"],
      });
    }
    const userFound = await User.findOne({
      $or: [{ identityDocumentNumber: identifier }, { email: identifier }],
    });

    if (!userFound)
      return res.status(400).json({
        message: [`Número de documento o correo no registrado.`],
      });

    const isMatch = await bcrypt.compare(password, userFound.password);
    if (!isMatch) {
      return res.status(400).json({
        message: ["La contraseña es incorrecta."],
      });
    }

    const token = await createAccessToken({
      id: userFound._id,
    });

    res.status(200).json({
      token,
      id: userFound._id,
      typeOfIdentityDocument: userFound.typeOfIdentityDocument,
      identityDocumentNumber: userFound.identityDocumentNumber,
      names: userFound.names,
      surnames: userFound.surnames,
      age: userFound.age,
      gender: userFound.gender,
      email: userFound.email,
      phoneNumber: userFound.phoneNumber,
      completedUserInformation: userFound.completedUserInformation,
      completedIeppoTest: userFound.completedIeppoTest,
      completedPhbTest: userFound.completedPhbTest,
      completedTepeTest: userFound.completedTepeTest,
      completedAssessmentSurvey: userFound.completedAssessmentSurvey,
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
  const access_token = getTokenFrom(req);
  if (!access_token) return res.send(false);

  jwt.verify(access_token, TOKEN_SECRET, async (error, user) => {
    if (error) {
      console.error("Error verifying access_token:", error);
      return res.status(401).json({ message: ["Tóken de acceso inválido"] });
    }

    const userFound = await User.findById(user.id);
    if (!userFound) return res.sendStatus(401);

    return res.json({
      token: access_token,
      id: userFound._id,
      typeOfIdentityDocument: userFound.typeOfIdentityDocument,
      identityDocumentNumber: userFound.identityDocumentNumber,
      names: userFound.names,
      surnames: userFound.surnames,
      age: userFound.age,
      gender: userFound.gender,
      email: userFound.email,
      phoneNumber: userFound.phoneNumber,
      completedUserInformation: userFound.completedUserInformation,
      completedIeppoTest: userFound.completedIeppoTest,
      completedPhbTest: userFound.completedPhbTest,
      completedTepeTest: userFound.completedTepeTest,
      completedAssessmentSurvey: userFound.completedAssessmentSurvey,
    });
  });
};

export const logout = async (req, res) => {
  res.clearCookie("access_token").status(200).json("Signout success!");
  return res.sendStatus(200);
};
