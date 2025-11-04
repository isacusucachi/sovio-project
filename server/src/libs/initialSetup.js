import bcrypt from "bcryptjs";
const fs = require("fs");
const csv = require("csv-parser");
import AdminUser from "../models/adminUser.model.js";
import { ADMIN_USERNAME, ADMIN_FULLNAME, ADMIN_PASSWORD } from "../config.js";
import EducationalService from "../models/educationalService.model.js";

const path = require("path");

export const createAdmin = async () => {
  try {
    // check for an existing admin user
    const AdminUserFound = await AdminUser.findOne({
      username: ADMIN_USERNAME,
    });
    if (AdminUserFound) return;

    const passwordHash = await bcrypt.hash(ADMIN_PASSWORD, 10);
    // create a new admin user
    const newAdminUser = await AdminUser.create({
      username: ADMIN_USERNAME,
      fullname: ADMIN_FULLNAME,
      password: passwordHash,
      role: "admin",
    });

    console.log(`new user created: ${newAdminUser.username}`);
  } catch (error) {
    console.error("Error al crear admin user", error);
  }
};

export const importEducationalServiceData = async () => {
  const count = await EducationalService.countDocuments();

  if (count === 0) {
    console.log("Database is empty. Initializing with data from CSV...");
    const records = [];

    const csvFilePath = path.join(__dirname, "../data/Padron_web.csv");

    fs.createReadStream(csvFilePath)
      .pipe(csv())
      .on("data", (row) => {
        // Convert row data to match schema
        const formattedRow = {
          COD_MOD: row.COD_MOD,
          ANEXO: row.ANEXO,
          CODINST: row.CODINST,
          CODLOCAL: row.CODLOCAL,
          CEN_EDU: row.CEN_EDU,
          NIV_MOD: row.NIV_MOD,
          D_NIV_MOD: row.D_NIV_MOD,
          D_FORMA: row.D_FORMA,
          COD_CAR: row.COD_CAR,
          D_COD_CAR: row.D_COD_CAR,
          TIPSSEXO: row.TIPSSEXO,
          D_TIPSSEXO: row.D_TIPSSEXO,
          GESTION: row.GESTION,
          D_GESTION: row.D_GESTION,
          GES_DEP: row.GES_DEP,
          D_GES_DEP: row.D_GES_DEP,
          DIRECTOR: row.DIRECTOR,
          TELEFONO: row.TELEFONO,
          EMAIL: row.EMAIL,
          PAGWEB: row.PAGWEB,
          DIR_CEN: row.DIR_CEN,
          LOCALIDAD: row.LOCALIDAD,
          CODCP_INEI: row.CODCP_INEI,
          CODCCPP: row.CODCCPP,
          CEN_POB: row.CEN_POB,
          AREA_CENSO: row.AREA_CENSO,
          DAREACENSO: row.DAREACENSO,
          CODGEO: row.CODGEO,
          D_DPTO: row.D_DPTO,
          D_PROV: row.D_PROV,
          D_DIST: row.D_DIST,
          D_REGION: row.D_REGION,
          CODOOII: row.CODOOII,
          D_DREUGEL: row.D_DREUGEL,
          NLAT_IE: parseFloat(row.NLAT_IE),
          NLONG_IE: parseFloat(row.NLONG_IE),
          TIPOPROG: row.TIPOPROG,
          D_TIPOPROG: row.D_TIPOPROG,
          COD_TUR: row.COD_TUR,
          D_COD_TUR: row.D_COD_TUR,
          NRORUC: row.NRORUC,
          RZSOCIAL: row.RZSOCIAL,
          PROMOTOR: row.PROMOTOR,
          ESTADO: row.ESTADO,
          D_ESTADO: row.D_ESTADO,
          D_FTE_DATO: row.D_FTE_DATO,
          TALUM_HOM: parseInt(row.TALUM_HOM, 10),
          TALUM_MUJ: parseInt(row.TALUM_MUJ, 10),
          TALUMNO: parseInt(row.TALUMNO, 10),
          TDOCENTE: parseInt(row.TDOCENTE, 10),
          TSECCION: parseInt(row.TSECCION, 10),
          FECHAREG: row.FECHAREG,
          FECHA_ACT: row.FECHA_ACT,
        };
        records.push(formattedRow);
      })
      .on("end", async () => {
        try {
          await EducationalService.insertMany(records);
          console.log(`${records.length} records successfully inserted.`);
        } catch (error) {
          console.error("Error inserting records:", error.message);
        }
      });
  } else {
    console.log("Database already initialized.");
  }
};
