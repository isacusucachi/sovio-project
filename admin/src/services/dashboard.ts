import axios from "./axios";

// ============================================================
// TIPOS
// ============================================================
export interface DashboardMetrics {
  totalUsers: number;
  totalEvaluated: number;
  totalTests: number;
  appearanceRating: number;
}

export interface TestsDistribution {
  labels: string[];
  series: number[];
}

export interface ChartData {
  categories: string[];
  series: number[];
}

export interface Comment {
  id: string;
  name: string;
  recommendation: string;
  rating: number;
  date: string;
}

export interface CommentsData {
  items: Comment[];
  total: number;
}

export interface CommentsPagination {
  currentPage: number;
  totalPages: number;
  totalComments: number;
  limit: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

export interface DashboardData {
  metrics: DashboardMetrics;
  testsDistribution: TestsDistribution;
  usersHistory: ChartData;
  satisfaction: ChartData;
  navigationDifficulty: ChartData;
  comments: CommentsData;
}

interface DashboardApiResponse {
  success: boolean;
  data: DashboardData;
  message?: string;
}

interface CommentsApiResponse {
  success: boolean;
  data: {
    comments: Comment[];
    pagination: CommentsPagination;
  };
  message?: string;
}

interface UsersHistoryApiResponse {
  success: boolean;
  data: ChartData;
  message?: string;
}

// ============================================================
// FUNCIONES DE API
// ============================================================

/**
 * Obtiene todos los datos del dashboard en una sola llamada
 * @param months - Número de meses para el historial (default: 12)
 * @param commentsLimit - Límite de comentarios iniciales (default: 5)
 */
export const getAllDashboardDataRequest = async (
  months: number = 12,
  commentsLimit: number = 5
): Promise<DashboardData> => {
  try {
    const response = await axios.get<DashboardApiResponse>(
      `/dashboard/all?months=${months}&commentsLimit=${commentsLimit}`
    );
    return response.data.data;
  } catch (error) {
    throw new Error("Error al obtener datos del dashboard.");
  }
};

/**
 * Obtiene las métricas principales (KPIs)
 */
export const getDashboardMetricsRequest = async (): Promise<DashboardMetrics> => {
  try {
    const response = await axios.get<{ success: boolean; data: DashboardMetrics }>(
      `/dashboard/metrics`
    );
    return response.data.data;
  } catch (error) {
    throw new Error("Error al obtener métricas del dashboard.");
  }
};

/**
 * Obtiene el historial de usuarios por mes
 * @param months - Número de meses a consultar
 */
export const getUsersHistoryRequest = async (
  months: number = 12
): Promise<ChartData> => {
  try {
    const response = await axios.get<UsersHistoryApiResponse>(
      `/dashboard/users-history?months=${months}`
    );
    return response.data.data;
  } catch (error) {
    throw new Error("Error al obtener historial de usuarios.");
  }
};

/**
 * Obtiene datos de satisfacción agrupados
 */
export const getSatisfactionDataRequest = async (): Promise<ChartData> => {
  try {
    const response = await axios.get<{ success: boolean; data: ChartData }>(
      `/dashboard/satisfaction`
    );
    return response.data.data;
  } catch (error) {
    throw new Error("Error al obtener datos de satisfacción.");
  }
};

/**
 * Obtiene datos de dificultad de navegación agrupados
 */
export const getNavigationDifficultyRequest = async (): Promise<ChartData> => {
  try {
    const response = await axios.get<{ success: boolean; data: ChartData }>(
      `/dashboard/navigation-difficulty`
    );
    return response.data.data;
  } catch (error) {
    throw new Error("Error al obtener datos de navegación.");
  }
};

/**
 * Obtiene la distribución de pruebas por tipo
 */
export const getTestsDistributionRequest = async (): Promise<TestsDistribution> => {
  try {
    const response = await axios.get<{ success: boolean; data: TestsDistribution }>(
      `/dashboard/tests-distribution`
    );
    return response.data.data;
  } catch (error) {
    throw new Error("Error al obtener distribución de pruebas.");
  }
};

/**
 * Obtiene comentarios con paginación
 * @param page - Número de página
 * @param limit - Comentarios por página
 */
export const getCommentsRequest = async (
  page: number = 1,
  limit: number = 5
): Promise<{ comments: Comment[]; pagination: CommentsPagination }> => {
  try {
    const response = await axios.get<CommentsApiResponse>(
      `/dashboard/comments?page=${page}&limit=${limit}`
    );
    return response.data.data;
  } catch (error) {
    throw new Error("Error al obtener comentarios.");
  }
};