import User from "../models/user.model.js";
import IeppoTest from "../models/ieppoTest.model.js";
import PhbTest from "../models/phbTest.model.js";
import TepeTest from "../models/tepeTest.model.js";
import AssessmentSurvey from "../models/assessmentSurvey.model.js";

// ============================================================
// HELPER: Mapear rating numérico a texto de apariencia
// ============================================================
const APPEARANCE_RATING_MAP = {
  "Muy bueno": 5,
  "Normal": 3,
  "Peor que la media": 2,
  "No me gusta nada": 1,
};

// ============================================================
// GET /api/dashboard/metrics
// Retorna las métricas principales (KPIs)
// ============================================================
export const getDashboardMetrics = async (req, res) => {
  try {
    // Total de usuarios registrados
    const totalUsers = await User.countDocuments();

    // Estudiantes evaluados (completaron las 3 pruebas)
    const totalEvaluated = await User.countDocuments({
      completedIeppoTest: true,
      completedPhbTest: true,
      completedTepeTest: true,
    });

    // Contar pruebas completadas por tipo
    const [ieppoCount, phbCount, tepeCount] = await Promise.all([
      IeppoTest.countDocuments(),
      PhbTest.countDocuments(),
      TepeTest.countDocuments(),
    ]);

    const totalTests = ieppoCount + phbCount + tepeCount;

    // Promedio de valoración de apariencia
    const appearanceAggregation = await AssessmentSurvey.aggregate([
      {
        $group: {
          _id: null,
          averageRating: { $avg: "$rating" },
          count: { $sum: 1 },
        },
      },
    ]);

    const appearanceRating =
      appearanceAggregation.length > 0
        ? Math.round(appearanceAggregation[0].averageRating * 10) / 10
        : 0;

    res.json({
      success: true,
      data: {
        totalUsers,
        totalEvaluated,
        totalTests,
        appearanceRating,
        testsByType: {
          ieppo: ieppoCount,
          phb: phbCount,
          tepe: tepeCount,
        },
      },
    });
  } catch (error) {
    console.error("Error en getDashboardMetrics:", error);
    res.status(500).json({
      success: false,
      message: "Error al obtener métricas del dashboard",
      error: error.message,
    });
  }
};

// ============================================================
// GET /api/dashboard/users-history
// Retorna el historial de registros de usuarios por mes
// Query params: ?months=12 (por defecto últimos 12 meses)
// ============================================================
export const getUsersHistory = async (req, res) => {
  try {
    const months = parseInt(req.query.months) || 12;

    // Calcular fecha de inicio
    const startDate = new Date();
    startDate.setMonth(startDate.getMonth() - months);
    startDate.setDate(1);
    startDate.setHours(0, 0, 0, 0);

    // Agregación para contar usuarios por mes
    const usersHistory = await User.aggregate([
      {
        $match: {
          _id: {
            $gte: new mongoose.Types.ObjectId.createFromTime(
              Math.floor(startDate.getTime() / 1000)
            ),
          },
        },
      },
      {
        $group: {
          _id: {
            year: { $year: "$_id" },
            month: { $month: "$_id" },
          },
          count: { $sum: 1 },
        },
      },
      {
        $sort: { "_id.year": 1, "_id.month": 1 },
      },
    ]);

    // Formatear datos para el frontend
    const monthNames = [
      "Ene", "Feb", "Mar", "Abr", "May", "Jun",
      "Jul", "Ago", "Sep", "Oct", "Nov", "Dic",
    ];

    // Crear array con todos los meses (incluyendo los que tienen 0)
    const result = [];
    const currentDate = new Date();

    for (let i = months - 1; i >= 0; i--) {
      const date = new Date();
      date.setMonth(currentDate.getMonth() - i);

      const year = date.getFullYear();
      const month = date.getMonth() + 1;

      const found = usersHistory.find(
        (item) => item._id.year === year && item._id.month === month
      );

      result.push({
        label: `${monthNames[month - 1]} ${year.toString().slice(-2)}`,
        year,
        month,
        count: found ? found.count : 0,
      });
    }

    res.json({
      success: true,
      data: {
        categories: result.map((item) => item.label),
        series: result.map((item) => item.count),
        raw: result,
      },
    });
  } catch (error) {
    console.error("Error en getUsersHistory:", error);
    res.status(500).json({
      success: false,
      message: "Error al obtener historial de usuarios",
      error: error.message,
    });
  }
};

// ============================================================
// GET /api/dashboard/satisfaction
// Retorna datos de satisfacción agrupados
// ============================================================
export const getSatisfactionData = async (req, res) => {
  try {
    const satisfactionAggregation = await AssessmentSurvey.aggregate([
      {
        $group: {
          _id: "$satisfactionRating",
          count: { $sum: 1 },
        },
      },
    ]);

    // Orden específico para el gráfico
    const order = [
      "Muy satisfecho/a",
      "Satisfecho/a",
      "Medianamente satisfecho/a",
      "Insatisfecho/a",
      "Muy insatisfecho/a",
    ];

    // Mapear a labels más cortos para el frontend
    const labelMap = {
      "Muy satisfecho/a": "Muy satisfecho",
      "Satisfecho/a": "Satisfecho",
      "Medianamente satisfecho/a": "Neutral",
      "Insatisfecho/a": "Insatisfecho",
      "Muy insatisfecho/a": "Muy insatisfecho",
    };

    const result = order.map((category) => {
      const found = satisfactionAggregation.find((item) => item._id === category);
      return {
        category: labelMap[category] || category,
        originalCategory: category,
        count: found ? found.count : 0,
      };
    });

    res.json({
      success: true,
      data: {
        categories: result.map((item) => item.category),
        series: result.map((item) => item.count),
        raw: result,
      },
    });
  } catch (error) {
    console.error("Error en getSatisfactionData:", error);
    res.status(500).json({
      success: false,
      message: "Error al obtener datos de satisfacción",
      error: error.message,
    });
  }
};

// ============================================================
// GET /api/dashboard/navigation-difficulty
// Retorna datos de dificultad de navegación agrupados
// ============================================================
export const getNavigationDifficultyData = async (req, res) => {
  try {
    const navigationAggregation = await AssessmentSurvey.aggregate([
      {
        $group: {
          _id: "$navigationDifficulty",
          count: { $sum: 1 },
        },
      },
    ]);

    // Orden específico para el gráfico
    const order = [
      "Muy sencilla",
      "Relativamente sencilla",
      "Normal",
      "Algo compleja",
      "Muy compleja",
    ];

    // Mapear a labels más cortos
    const labelMap = {
      "Muy sencilla": "Muy fácil",
      "Relativamente sencilla": "Fácil",
      "Normal": "Normal",
      "Algo compleja": "Difícil",
      "Muy compleja": "Muy difícil",
    };

    const result = order.map((category) => {
      const found = navigationAggregation.find((item) => item._id === category);
      return {
        category: labelMap[category] || category,
        originalCategory: category,
        count: found ? found.count : 0,
      };
    });

    res.json({
      success: true,
      data: {
        categories: result.map((item) => item.category),
        series: result.map((item) => item.count),
        raw: result,
      },
    });
  } catch (error) {
    console.error("Error en getNavigationDifficultyData:", error);
    res.status(500).json({
      success: false,
      message: "Error al obtener datos de dificultad de navegación",
      error: error.message,
    });
  }
};

// ============================================================
// GET /api/dashboard/tests-distribution
// Retorna la distribución de pruebas por tipo
// ============================================================
export const getTestsDistribution = async (req, res) => {
  try {
    const [ieppoCount, phbCount, tepeCount] = await Promise.all([
      IeppoTest.countDocuments(),
      PhbTest.countDocuments(),
      TepeTest.countDocuments(),
    ]);

    res.json({
      success: true,
      data: {
        labels: ["IEPPO", "PHB", "TEPE"],
        series: [ieppoCount, phbCount, tepeCount],
        raw: [
          { label: "IEPPO", count: ieppoCount },
          { label: "PHB", count: phbCount },
          { label: "TEPE", count: tepeCount },
        ],
      },
    });
  } catch (error) {
    console.error("Error en getTestsDistribution:", error);
    res.status(500).json({
      success: false,
      message: "Error al obtener distribución de pruebas",
      error: error.message,
    });
  }
};

// ============================================================
// GET /api/dashboard/comments
// Retorna comentarios con paginación
// Query params: ?page=1&limit=5
// ============================================================
export const getComments = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const skip = (page - 1) * limit;

    // Total de comentarios (solo los que tienen comentario)
    const totalComments = await AssessmentSurvey.countDocuments({
      comments: { $exists: true, $ne: "" },
    });

    // Obtener comentarios con información del usuario
    const comments = await AssessmentSurvey.aggregate([
      {
        $match: {
          comments: { $exists: true, $ne: "" },
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "user",
          foreignField: "_id",
          as: "userInfo",
        },
      },
      {
        $unwind: "$userInfo",
      },
      {
        $project: {
          _id: 1,
          comment: "$comments",
          rating: 1,
          satisfactionRating: 1,
          createdAt: "$_id",
          userName: {
            $concat: ["$userInfo.names", " ", "$userInfo.surnames"],
          },
        },
      },
      {
        $sort: { _id: -1 }, // Más recientes primero
      },
      {
        $skip: skip,
      },
      {
        $limit: limit,
      },
    ]);

    // Formatear respuesta
    const formattedComments = comments.map((comment) => ({
      id: comment._id.toString(),
      name: comment.userName,
      recommendation: comment.comment,
      rating: comment.rating,
      date: comment._id.getTimestamp().toISOString().split("T")[0],
    }));

    const totalPages = Math.ceil(totalComments / limit);

    res.json({
      success: true,
      data: {
        comments: formattedComments,
        pagination: {
          currentPage: page,
          totalPages,
          totalComments,
          limit,
          hasNextPage: page < totalPages,
          hasPrevPage: page > 1,
        },
      },
    });
  } catch (error) {
    console.error("Error en getComments:", error);
    res.status(500).json({
      success: false,
      message: "Error al obtener comentarios",
      error: error.message,
    });
  }
};

// ============================================================
// GET /api/dashboard/all
// Retorna TODOS los datos del dashboard en una sola llamada
// Útil para cargar todo de una vez y reducir requests
// ============================================================
export const getAllDashboardData = async (req, res) => {
  try {
    const months = parseInt(req.query.months) || 12;
    const commentsLimit = parseInt(req.query.commentsLimit) || 5;

    // Ejecutar todas las consultas en paralelo
    const [
      totalUsers,
      totalEvaluated,
      ieppoCount,
      phbCount,
      tepeCount,
      appearanceAggregation,
      satisfactionAggregation,
      navigationAggregation,
      usersHistory,
      totalComments,
      comments,
    ] = await Promise.all([
      // Métricas básicas
      User.countDocuments(),
      User.countDocuments({
        completedIeppoTest: true,
        completedPhbTest: true,
        completedTepeTest: true,
      }),
      IeppoTest.countDocuments(),
      PhbTest.countDocuments(),
      TepeTest.countDocuments(),

      // Promedio apariencia
      AssessmentSurvey.aggregate([
        { $group: { _id: null, averageRating: { $avg: "$rating" } } },
      ]),

      // Satisfacción
      AssessmentSurvey.aggregate([
        { $group: { _id: "$satisfactionRating", count: { $sum: 1 } } },
      ]),

      // Navegación
      AssessmentSurvey.aggregate([
        { $group: { _id: "$navigationDifficulty", count: { $sum: 1 } } },
      ]),

      // Historial de usuarios (usando createdAt del ObjectId)
      User.aggregate([
        {
          $group: {
            _id: {
              year: { $year: { $toDate: "$_id" } },
              month: { $month: { $toDate: "$_id" } },
            },
            count: { $sum: 1 },
          },
        },
        { $sort: { "_id.year": 1, "_id.month": 1 } },
      ]),

      // Total comentarios
      AssessmentSurvey.countDocuments({
        comments: { $exists: true, $ne: "" },
      }),

      // Comentarios recientes
      AssessmentSurvey.aggregate([
        { $match: { comments: { $exists: true, $ne: "" } } },
        {
          $lookup: {
            from: "users",
            localField: "user",
            foreignField: "_id",
            as: "userInfo",
          },
        },
        { $unwind: "$userInfo" },
        {
          $project: {
            _id: 1,
            comment: "$comments",
            rating: 1,
            userName: { $concat: ["$userInfo.names", " ", "$userInfo.surnames"] },
          },
        },
        { $sort: { _id: -1 } },
        { $limit: commentsLimit },
      ]),
    ]);

    // Procesar historial de usuarios
    const monthNames = [
      "Ene", "Feb", "Mar", "Abr", "May", "Jun",
      "Jul", "Ago", "Sep", "Oct", "Nov", "Dic",
    ];

    const currentDate = new Date();
    const historyResult = [];

    for (let i = months - 1; i >= 0; i--) {
      const date = new Date();
      date.setMonth(currentDate.getMonth() - i);
      const year = date.getFullYear();
      const month = date.getMonth() + 1;

      const found = usersHistory.find(
        (item) => item._id.year === year && item._id.month === month
      );

      historyResult.push({
        label: `${monthNames[month - 1]} ${year.toString().slice(-2)}`,
        count: found ? found.count : 0,
      });
    }

    // Procesar satisfacción
    const satisfactionOrder = [
      "Muy satisfecho/a",
      "Satisfecho/a",
      "Medianamente satisfecho/a",
      "Insatisfecho/a",
      "Muy insatisfecho/a",
    ];
    const satisfactionLabelMap = {
      "Muy satisfecho/a": "Muy satisfecho",
      "Satisfecho/a": "Satisfecho",
      "Medianamente satisfecho/a": "Neutral",
      "Insatisfecho/a": "Insatisfecho",
      "Muy insatisfecho/a": "Muy insatisfecho",
    };

    const satisfactionResult = satisfactionOrder.map((cat) => {
      const found = satisfactionAggregation.find((item) => item._id === cat);
      return {
        category: satisfactionLabelMap[cat],
        count: found ? found.count : 0,
      };
    });

    // Procesar navegación
    const navigationOrder = [
      "Muy sencilla",
      "Relativamente sencilla",
      "Normal",
      "Algo compleja",
      "Muy compleja",
    ];
    const navigationLabelMap = {
      "Muy sencilla": "Muy fácil",
      "Relativamente sencilla": "Fácil",
      "Normal": "Normal",
      "Algo compleja": "Difícil",
      "Muy compleja": "Muy difícil",
    };

    const navigationResult = navigationOrder.map((cat) => {
      const found = navigationAggregation.find((item) => item._id === cat);
      return {
        category: navigationLabelMap[cat],
        count: found ? found.count : 0,
      };
    });

    // Formatear comentarios
    const formattedComments = comments.map((c) => ({
      id: c._id.toString(),
      name: c.userName,
      recommendation: c.comment,
      rating: c.rating,
      date: c._id.getTimestamp().toISOString().split("T")[0],
    }));

    res.json({
      success: true,
      data: {
        metrics: {
          totalUsers,
          totalEvaluated,
          totalTests: ieppoCount + phbCount + tepeCount,
          appearanceRating:
            appearanceAggregation.length > 0
              ? Math.round(appearanceAggregation[0].averageRating * 10) / 10
              : 0,
        },
        testsDistribution: {
          labels: ["IEPPO", "PHB", "TEPE"],
          series: [ieppoCount, phbCount, tepeCount],
        },
        usersHistory: {
          categories: historyResult.map((item) => item.label),
          series: historyResult.map((item) => item.count),
        },
        satisfaction: {
          categories: satisfactionResult.map((item) => item.category),
          series: satisfactionResult.map((item) => item.count),
        },
        navigationDifficulty: {
          categories: navigationResult.map((item) => item.category),
          series: navigationResult.map((item) => item.count),
        },
        comments: {
          items: formattedComments,
          total: totalComments,
        },
      },
    });
  } catch (error) {
    console.error("Error en getAllDashboardData:", error);
    res.status(500).json({
      success: false,
      message: "Error al obtener datos del dashboard",
      error: error.message,
    });
  }
};