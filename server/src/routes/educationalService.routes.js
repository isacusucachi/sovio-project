const express = require("express");
const {
  getProvincias,
  getDistritos,
  getInstituciones,
} = require("../controllers/educationalService.controller");

const router = express.Router();

router.get("/provincias", getProvincias);
router.get("/distritos", getDistritos);
router.get("/instituciones", getInstituciones);

module.exports = router;
