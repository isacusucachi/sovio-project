const EducationalService = require("../models/educationalService.model");

export const getProvincias = async (req, res) => {
  try {
    const { departamento } = req.query;
    if (!departamento) {
      return res.status(400).json({ message: "El departamento es requerido." });
    }

    const provincias = await EducationalService.distinct("D_PROV", {
      D_DPTO: departamento,
    });

    res.json(provincias.sort());
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al obtener provincias." });
  }
};
export const getDistritos = async (req, res) => {
  try {
    const { departamento, provincia } = req.query;
    if (!departamento || !provincia) {
      return res
        .status(400)
        .json({ message: "El departamento y la provincia son requeridos." });
    }

    const distritos = await EducationalService.distinct("D_DIST", {
      D_DPTO: departamento,
      D_PROV: provincia,
    });

    res.json(distritos.sort());
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al obtener distritos." });
  }
};

export const getInstituciones = async (req, res) => {
  try {
    const { departamento, provincia, distrito } = req.query;
    if (!departamento || !provincia || !distrito) {
      return res
        .status(400)
        .json({
          message: "El departamento, la provincia y el distrito son requeridos.",
        });
    }

    const instituciones = await EducationalService.find(
      {
        D_DPTO: departamento,
        D_PROV: provincia,
        D_DIST: distrito,
      },
      { _id: 1, CEN_EDU: 1, D_NIV_MOD: 1 } // Solo devolver los campos necesarios
    ).sort({ CEN_EDU: 1 });

    res.json(instituciones);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al obtener instituciones educativas." });
  }
};