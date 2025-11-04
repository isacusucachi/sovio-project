import FinalTestReport from "../models/finalTestReport.model.js";
import AdminUser from "../models/adminUser.model";
import User from "../models/user.model.js";

export const getVocationalTestReport = async (req, res) => {
  try {
    const finalTestReportFound = await FinalTestReport.findOne({
      userId: req.user.id,
    })
      .populate({
        path: "userId",
        populate: { path: "personalInformation" },
      })
      .populate("evaluator");

    res.status(200).json(finalTestReportFound);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getVocationalTestReport_Admin = async (req, res) => {
  try {
    const { id } = req.params;
    // Buscar el reporte final con el ID proporcionado
    const finalReport = await FinalTestReport.findById(id)
      .populate([
        {
          path: "userId",
          select:
            "identityDocumentNumber names surnames age gender height birthdate educationalService personalInformation completedIeppoTest completedPhbTest completedTepeTest",
          populate: [
            {
              path: "educationalService",
              select: "CEN_EDU",
            },
            {
              path: "personalInformation",
            },
          ],
        },
        {
          path: "evaluator",
          select: "fullname signature",
        },
      ])
      .select(
        "evaluationDate completedUserInformation ieppoTestResult phbTestResult tepeTestResult vocationalTypes careersOption observations evaluated"
      );

    if (!finalReport) {
      return res.status(404).json({ message: "Reporte final no encontrado" });
    }

    // Construir la respuesta
    const reportDetails = {
      fullname: `${finalReport.userId?.surnames || ""} ${
        finalReport.userId?.names || ""
      }`.trim(),
      dni: finalReport.userId?.identityDocumentNumber || "N/A",
      age: finalReport.userId?.age || "N/A",
      gender: finalReport.userId?.gender || "N/A",
      height: finalReport.userId?.height || "N/A",
      evaluationDate: finalReport.evaluationDate.toISOString().split("T")[0],
      educationalService:
        finalReport.userId?.educationalService?.CEN_EDU || "N/A",
      personalInformation: finalReport.userId?.personalInformation || {},
      ieppoTestResult: finalReport.userId.completedIeppoTest
        ? finalReport.ieppoTestResult
        : {},
      phbTestResult: finalReport.userId.completedPhbTest
        ? finalReport.phbTestResult
        : {},
      tepeTestResult: finalReport.userId.completedTepeTest
        ? finalReport.tepeTestResult
        : {},
      vocationalTypes: finalReport.vocationalTypes || {},
      careersOption: finalReport.careersOption || {},
      observations: finalReport.observations || "",
      evaluatorFullname: finalReport.evaluator?.fullname || "",
      evaluatorSignature: finalReport.evaluator?.signature || "",
    };
    res.status(200).json(reportDetails);
  } catch (error) {
    res.status(500).json({ error: error.message });
    console.log(error.message);
  }
};

export const getVocationalTestReports_Admin = async (req, res) => {
  try {
    const { page = 1, limit = 20, dni } = req.query;

    const skip = (page - 1) * limit;

    let userFilter = {};

    if (dni) {
      // Buscar al usuario con el DNI proporcionado
      const user = await User.findOne({ identityDocumentNumber: dni }).select(
        "_id"
      );
      if (!user) {
        return res.status(200).json({
          vocationalTestReports: [],
          totalPages: 1,
          currentPage: Number(page),
          message: "Usuario no encontrado",
        });
      }
      userFilter.userId = user._id;
    }

    // Contar el total de documentos según el filtro aplicado
    const total = await FinalTestReport.countDocuments({
      evaluated: false,
      ...userFilter,
    });

    // Buscar los reportes de evaluación pendientes
    const vocationalTestReports = await FinalTestReport.find({
      evaluated: false,
      ...userFilter,
    })
      .sort({ _id: -1 })
      .skip(skip)
      .limit(limit)
      .populate({
        path: "userId",
        select:
          "identityDocumentNumber names surnames email phoneNumber completedUserInformation completedPhbTest completedIeppoTest completedTepeTest educationalService grade_section_cycle",
        populate: {
          path: "educationalService",
          select: "CEN_EDU",
        },
      })
      .select(
        "evaluationDate completedUserInformation completedIeppoTest completedPhbTest completedTepeTest"
      );

    // Formatear la respuesta
    const formattedReports = vocationalTestReports.map((report) => ({
      _id: report._id,
      dni: report.userId?.identityDocumentNumber || "N/A",
      fullname: `${report.userId?.surnames || ""} ${report.userId?.names || ""}`
        .trim()
        .toUpperCase(),
      email: report.userId?.email || "N/A",
      phoneNumber: report.userId?.phoneNumber || "N/A",
      educationalService: report.userId?.educationalService?.CEN_EDU || "N/A",
      grade_section_cycle: report.userId?.grade_section_cycle || "N/A",
      evaluationDate: report.evaluationDate.toISOString().split("T")[0],
      completedUserInformation: report.userId?.completedUserInformation,
      completedIeppoTest: report.userId?.completedIeppoTest,
      completedPhbTest: report.userId?.completedPhbTest,
      completedTepeTest: report.userId?.completedTepeTest,
    }));

    res.status(200).json({
      vocationalTestReports: formattedReports,
      totalPages: Math.ceil(total / limit),
      currentPage: Number(page),
    });
  } catch (error) {
    const statusCode = error.statusCode || 500;
    res.status(statusCode).json({
      message: error.message || "Error en la consulta de reportes.",
    });
  }
};

export const getEvaluatedVocationalTestReports_Admin = async (req, res) => {
  try {
    const { page = 1, limit = 20, dni } = req.query;

    const skip = (page - 1) * limit;

    let userFilter = {};

    if (dni) {
      // Buscar al usuario con el DNI proporcionado
      const user = await User.findOne({ identityDocumentNumber: dni }).select(
        "_id"
      );
      if (!user) {
        return res.status(200).json({
          vocationalTestReports: [],
          totalPages: 1,
          currentPage: Number(page),
          message: "Usuario no encontrado",
        });
      }
      userFilter.userId = user._id;
    }

    // Contar el total de documentos según el filtro aplicado
    const total = await FinalTestReport.countDocuments({
      evaluated: true,
      ...userFilter,
    });

    // Buscar los reportes de evaluación pendientes
    const vocationalTestReports = await FinalTestReport.find({
      evaluated: true,
      ...userFilter,
    })
      .sort({ updatedAt: -1, _id: 1 })
      .skip(skip)
      .limit(limit)
      .populate({
        path: "userId",
        select:
          "identityDocumentNumber names surnames email phoneNumber completedUserInformation completedPhbTest completedIeppoTest completedTepeTest educationalService grade_section_cycle",
        populate: {
          path: "educationalService",
          select: "CEN_EDU",
        },
      })
      .select(
        "evaluationDate completedUserInformation completedIeppoTest completedPhbTest completedTepeTest"
      );

    // Formatear la respuesta
    const formattedReports = vocationalTestReports.map((report) => ({
      _id: report._id,
      dni: report.userId?.identityDocumentNumber || "N/A",
      fullname: `${report.userId?.surnames || ""} ${report.userId?.names || ""}`
        .trim()
        .toUpperCase(),
      email: report.userId?.email || "N/A",
      phoneNumber: report.userId?.phoneNumber || "N/A",
      educationalService: report.userId?.educationalService?.CEN_EDU || "N/A",
      grade_section_cycle: report.userId?.grade_section_cycle || "N/A",
      evaluationDate: report.evaluationDate.toISOString().split("T")[0],
      completedUserInformation: report.userId?.completedUserInformation,
      completedIeppoTest: report.userId?.completedIeppoTest,
      completedPhbTest: report.userId?.completedPhbTest,
      completedTepeTest: report.userId?.completedTepeTest,
    }));
    res.status(200).json({
      vocationalTestReports: formattedReports,
      totalPages: Math.ceil(total / limit),
      currentPage: Number(page),
    });
  } catch (error) {
    const statusCode = error.statusCode || 500;
    res.status(statusCode).json({
      message: error.message || "Error en la consulta de reportes.",
    });
  }
};

export const getReports_Admin = async (req, res) => {
  try {
    let { page = 1, limit = 20, startDate, endDate } = req.query;

    if (limit === "all") {
      limit = 0; // Traer todos los registros sin paginación
    } else {
      limit = Number(limit);
    }

    const skip = limit === 0 ? 0 : (page - 1) * limit;

    let dateFilter = {};

    if (startDate && endDate) {
      dateFilter.evaluationDate = {
        $gte: new Date(startDate),
        $lte: new Date(endDate),
      };
    }

    const total = await FinalTestReport.countDocuments({
      evaluated: true,
      ...dateFilter,
    });

    const vocationalTestReports = await FinalTestReport.find({
      evaluated: true,
      ...dateFilter,
    })
      .skip(skip)
      .limit(limit)
      .populate({
        path: "userId",
        select:
          "identityDocumentNumber names surnames age gender educationalService grade_section_cycle",
        populate: {
          path: "educationalService",
          select: "D_DPTO D_PROV D_DIST CEN_EDU",
        },
      })
      .select("evaluationDate vocationalTypes careersOption");

    const vocationalTypeMap = {
      leaderShip: "LIDERAZGO",
      mechanicalTechnician: "TÉCNICO - MECÁNICO",
      social: "SOCIAL",
      organized: "ORGANIZADO",
      artistic: "ARTÍSTICO",
      entrepreneur: "EMPRENDEDOR",
      investigative: "INVESTIGATIVO",
    };

    const formattedReports = vocationalTestReports.map((report) => ({
      _id: report._id,
      D_DPTO: report.userId?.educationalService?.D_DPTO || "N/A",
      D_PROV: report.userId?.educationalService?.D_PROV || "N/A",
      D_DIST: report.userId?.educationalService?.D_DIST || "N/A",
      CEN_EDU: report.userId?.educationalService?.CEN_EDU || "N/A",
      grade_section_cycle: report.userId?.grade_section_cycle || "N/A",
      evaluationDate: report.evaluationDate.toISOString().split("T")[0],
      dni: report.userId?.identityDocumentNumber || "N/A",
      fullname: `${report.userId?.surnames || ""} ${report.userId?.names || ""}`
        .trim()
        .toUpperCase(),
      age: report.userId?.age || "N/A",
      gender:
        report.userId?.gender === "femenino"
          ? "F"
          : report.userId?.gender === "masculino"
          ? "M"
          : "N/A",
      vocationalTypes: `${
        vocationalTypeMap[report.vocationalTypes?.vocationalTypes1] || ""
      } Y ${vocationalTypeMap[report.vocationalTypes?.vocationalTypes2] || ""}`,
      careersOption: `${report.careersOption?.careersOption1 || ""} Y ${
        report.careersOption?.careersOption2 || ""
      }`
        .trim()
        .toUpperCase(),
    }));

    res.status(200).json({
      vocationalTestReports: formattedReports,
      totalPages: limit === 0 ? 1 : Math.ceil(total / limit),
      currentPage: Number(page),
    });
  } catch (error) {
    res.status(error.statusCode || 500).json({
      message: error.message || "Error en la consulta de reportes.",
    });
  }
};

export const getCareersByUsersAndEvaluationDate = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;
    console.log("startDate:", startDate, "endDate:", endDate);

    let query = { evaluated: true };

    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      query.evaluationDate = { $gte: start, $lte: end };
      console.log("hola");
    }

    const reports = await FinalTestReport.find(query)
      .select("evaluationDate careersOption")
      .populate({
        path: "userId",
        select: "names surnames dni",
        populate: {
          path: "personalInformation",
          select: "age",
        },
      });

    res.status(200).json(reports);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const evaluateTestReport = async (req, res) => {
  try {
    const { id } = req.params;
    const finalTestReportFound = await FinalTestReport.findById({
      _id: id,
    });

    if (!finalTestReportFound) {
      return res.status(404).json({ message: "Reporte final no encontrado" });
    }

    const adminUserFound = await AdminUser.findById({
      _id: req.adminUser.id,
    });

    if (!adminUserFound) {
      return res.status(404).json({ message: "Usuario admin no encontrado" });
    }

    if (!adminUserFound.status) {
      return res.status(400).json({
        message: ["Solicitud denegada"],
      });
    }

    const allowedFields = {
      evaluated: true,
      evaluator: adminUserFound._id,
      vocationalTypes: {
        vocationalTypes1: req.body.vocationalTypes1,
        vocationalTypes2: req.body.vocationalTypes2,
      },
      careersOption: {
        careersOption1: req.body.careersOption1,
        careersOption2: req.body.careersOption2,
      },
      observations: req.body.observations,
    };
    const updatedFinalTestReport = await FinalTestReport.findByIdAndUpdate(
      finalTestReportFound._id,
      allowedFields,
      {
        new: true,
      }
    );
    return res.status(201).json(updatedFinalTestReport);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
