const mongoose = require("mongoose");

const EducationalServiceSchema = new mongoose.Schema({
  COD_MOD: {
    type: String,
    description: "Código modular",
    unique: true,
  },
  ANEXO: {
    type: String,
    description: "Anexo",
  },
  CODINST: {
    type: String,
    description: "Código de la institución educativa",
  },
  CODLOCAL: {
    type: String,
    description: "Código de local educativo",
  },
  CEN_EDU: {
    type: String,
    description: "Nro. y/o Nombre del servicio educativo",
  },
  NIV_MOD: {
    type: String,
    description: "Código de Nivel / Modalidad",
  },
  D_NIV_MOD: {
    type: String,
    description: "Nivel / Modalidad",
  },
  D_FORMA: {
    type: String,
    description: "Forma de atención",
  },
  COD_CAR: {
    type: String,
    description: "Código de característica (Censo educativo 2023)",
  },
  D_COD_CAR: {
    type: String,
    description: "Detalle de característica (Censo educativo 2023)",
  },
  TIPSSEXO: {
    type: String,
    description: "Código de género",
  },
  D_TIPSSEXO: {
    type: String,
    description: "Género de los alumnos",
  },
  GESTION: {
    type: String,
    description: "Código de gestión",
  },
  D_GESTION: {
    type: String,
    description: "Gestión del servicio educativo",
  },
  GES_DEP: {
    type: String,
    description: "Código de Dependencia",
  },
  D_GES_DEP: {
    type: String,
    description: "Dependencia",
  },
  DIRECTOR: {
    type: String,
    description: "Nombre del director",
  },
  TELEFONO: {
    type: String,
    description: "Teléfono",
  },
  EMAIL: {
    type: String,
    description: "Correo electrónico",
  },
  PAGWEB: {
    type: String,
    description: "Página web",
  },
  DIR_CEN: {
    type: String,
    description: "Dirección del local educativo",
  },
  LOCALIDAD: {
    type: String,
    description: "Localidad o lugar donde está ubicado el local educativo",
  },
  CODCP_INEI: {
    type: String,
    description: "Código del centro poblado - INEI",
  },
  CODCCPP: {
    type: String,
    description: "Código del centro poblado - UE-MINEDU",
  },
  CEN_POB: {
    type: String,
    description: "Centro Poblado",
  },
  AREA_CENSO: {
    type: String,
    description: "Código del área geográfica (2000 Habitantes)",
  },
  DAREACENSO: {
    type: String,
    description: "Detalle del área geográfica (2000 Habitantes)",
  },
  CODGEO: {
    type: String,
    description: "Código de ubicación geográfica (DD-PP-DI)",
  },
  D_DPTO: {
    type: String,
    description: "Nombre departamento",
  },
  D_PROV: {
    type: String,
    description: "Nombre provincia",
  },
  D_DIST: {
    type: String,
    description: "Nombre distrito",
  },
  D_REGION: {
    type: String,
    description: "Dirección o Gerencia regional de educación",
  },
  CODOOII: {
    type: String,
    description: "Código de DRE o UGEL que supervisa el servicio educativo",
  },
  D_DREUGEL: {
    type: String,
    description: "Nombre de la DRE o UGEL que supervisa el servicio educativo",
  },
  NLAT_IE: {
    type: Number,
    description: "Coordenada geográfica - Latitud",
  },
  NLONG_IE: {
    type: Number,
    description: "Coordenada geográfica - Longitud",
  },
  TIPOPROG: {
    type: String,
    description: "Código del tipo de programa",
  },
  D_TIPOPROG: {
    type: String,
    description: "Detalle de tipo de programa",
  },
  COD_TUR: {
    type: String,
    description: "Código del turno de atención",
  },
  D_COD_TUR: {
    type: String,
    description: "Detalle del turno de atención",
  },
  NRORUC: {
    type: String,
    description: "Número de RUC de IE de personería jurídica",
  },
  RZSOCIAL: {
    type: String,
    description: "Razón social de IE de personería jurídica",
  },
  PROMOTOR: {
    type: String,
    description: "Promotor de IE de persona natural",
  },
  ESTADO: {
    type: String,
    description: "Código de estado del servicio educativo",
  },
  D_ESTADO: {
    type: String,
    description: "Detalle de estado del servicio educativo",
  },
  D_FTE_DATO: {
    type: String,
    description: "Tipo de la fuente de datos registrada en el censo educativo",
  },
  TALUM_HOM: {
    type: Number,
    description: "Total alumnos - hombres (Censo educativo 2023)",
  },
  TALUM_MUJ: {
    type: Number,
    description: "Total alumnos - mujeres (Censo educativo 2023)",
  },
  TALUMNO: {
    type: Number,
    description: "Total alumnos (Censo educativo 2023)",
  },
  TDOCENTE: {
    type: Number,
    description: "Total docentes (Censo educativo 2023)",
  },
  TSECCION: {
    type: Number,
    description: "Total secciones (Censo educativo 2023)",
  },
  FECHAREG: {
    type: String,
    description: "Fecha de incorporación al registro de servicio educativo",
  },
  FECHA_ACT: {
    type: String,
    description: "Fecha de actualización",
  },
});

module.exports = mongoose.model("EducationalService", EducationalServiceSchema);
