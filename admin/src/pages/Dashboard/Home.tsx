import { useEffect, useState, useMemo, useCallback } from "react";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import PageMeta from "../../components/common/PageMeta";

import {
  FiUsers,
  FiUserCheck,
  FiStar,
  FiClipboard,
  FiChevronDown,
  FiChevronLeft,
  FiChevronRight,
  FiRefreshCw,
  FiAlertCircle,
} from "react-icons/fi";
import Chart from "react-apexcharts";
import type { ApexOptions } from "apexcharts";

import {
  getAllDashboardDataRequest,
  getUsersHistoryRequest,
  getCommentsRequest,
  type DashboardData,
  type ChartData,
  type Comment,
  type CommentsPagination,
} from "../../services/dashboard";

// ----------------------------------------------------
// TIPOS
// ----------------------------------------------------
type TimeRange = "6m" | "1y" | "2y" | "all";

// ----------------------------------------------------
// UTILIDADES
// ----------------------------------------------------
const timeRangeToMonths = (range: TimeRange): number => {
  const map: Record<TimeRange, number> = {
    "6m": 6,
    "1y": 12,
    "2y": 24,
    "all": 120,
  };
  return map[range];
};

// ----------------------------------------------------
// PALETA DE COLORES
// ----------------------------------------------------
const COLORS = {
  primary: "#6366F1",
  secondary: "#8B5CF6",
  accent: "#06B6D4",
};

// ----------------------------------------------------
// COMPONENTE: KPI Card
// ----------------------------------------------------
interface KPICardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  subtitle?: string;
  loading?: boolean;
}

function KPICard({ title, value, icon, subtitle, loading }: KPICardProps) {
  return (
    <article className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl p-5 transition-shadow hover:shadow-md">
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">
            {title}
          </p>
          {loading ? (
            <div className="h-8 w-20 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
          ) : (
            <p className="text-2xl font-semibold text-gray-900 dark:text-gray-50">
              {value}
            </p>
          )}
          {subtitle && (
            <p className="text-xs text-gray-400 dark:text-gray-500">
              {subtitle}
            </p>
          )}
        </div>
        <div className="p-2.5 bg-gray-50 dark:bg-gray-700/50 rounded-lg text-gray-600 dark:text-gray-300">
          {icon}
        </div>
      </div>
    </article>
  );
}

// ----------------------------------------------------
// COMPONENTE: Chart Container
// ----------------------------------------------------
interface ChartContainerProps {
  title: string;
  children: React.ReactNode;
  controls?: React.ReactNode;
  loading?: boolean;
}

function ChartContainer({
  title,
  children,
  controls,
  loading,
}: ChartContainerProps) {
  return (
    <section className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 p-5 rounded-xl">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-base font-semibold text-gray-800 dark:text-gray-100">
          {title}
        </h3>
        {controls}
      </div>
      {loading ? (
        <div className="h-[320px] flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
        </div>
      ) : (
        children
      )}
    </section>
  );
}

// ----------------------------------------------------
// COMPONENTE: Selector de rango temporal
// ----------------------------------------------------
interface TimeRangeSelectorProps {
  value: TimeRange;
  onChange: (range: TimeRange) => void;
  disabled?: boolean;
}

function TimeRangeSelector({
  value,
  onChange,
  disabled,
}: TimeRangeSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);

  const options: { value: TimeRange; label: string }[] = [
    { value: "6m", label: "Últimos 6 meses" },
    { value: "1y", label: "Último año" },
    { value: "2y", label: "Últimos 2 años" },
    { value: "all", label: "Todo" },
  ];

  const selectedLabel = options.find((opt) => opt.value === value)?.label;

  return (
    <div className="relative">
      <button
        onClick={() => !disabled && setIsOpen(!isOpen)}
        disabled={disabled}
        className="flex items-center gap-1.5 px-3 py-1.5 text-sm text-gray-600 dark:text-gray-300 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        {selectedLabel}
        <FiChevronDown
          className={`w-4 h-4 transition-transform ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
          />
          <ul
            className="absolute right-0 top-full mt-1 z-20 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg py-1 min-w-[160px]"
            role="listbox"
          >
            {options.map((option) => (
              <li key={option.value}>
                <button
                  onClick={() => {
                    onChange(option.value);
                    setIsOpen(false);
                  }}
                  className={`w-full text-left px-3 py-2 text-sm transition-colors ${
                    value === option.value
                      ? "bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400"
                      : "text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                  }`}
                  role="option"
                  aria-selected={value === option.value}
                >
                  {option.label}
                </button>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}

// ----------------------------------------------------
// COMPONENTE: Paginación
// ----------------------------------------------------
interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  disabled?: boolean;
}

function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  disabled,
}: PaginationProps) {
  if (totalPages <= 1) return null;

  const getVisiblePages = () => {
    const maxVisible = 5;
    if (totalPages <= maxVisible) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const half = Math.floor(maxVisible / 2);
    let start = Math.max(1, currentPage - half);
    const end = Math.min(totalPages, start + maxVisible - 1);

    if (end - start + 1 < maxVisible) {
      start = Math.max(1, end - maxVisible + 1);
    }

    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  };

  const visiblePages = getVisiblePages();

  return (
    <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-700">
      <p className="text-sm text-gray-500 dark:text-gray-400">
        Página {currentPage} de {totalPages}
      </p>
      <div className="flex items-center gap-1">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1 || disabled}
          className="p-1.5 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          aria-label="Página anterior"
        >
          <FiChevronLeft className="w-5 h-5" />
        </button>

        {visiblePages[0] > 1 && (
          <>
            <button
              onClick={() => onPageChange(1)}
              disabled={disabled}
              className="w-8 h-8 rounded-lg text-sm font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              1
            </button>
            {visiblePages[0] > 2 && (
              <span className="px-1 text-gray-400">...</span>
            )}
          </>
        )}

        {visiblePages.map((page) => (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            disabled={disabled}
            className={`w-8 h-8 rounded-lg text-sm font-medium transition-colors ${
              currentPage === page
                ? "bg-indigo-100 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-400"
                : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
            }`}
            aria-label={`Ir a página ${page}`}
            aria-current={currentPage === page ? "page" : undefined}
          >
            {page}
          </button>
        ))}

        {visiblePages[visiblePages.length - 1] < totalPages && (
          <>
            {visiblePages[visiblePages.length - 1] < totalPages - 1 && (
              <span className="px-1 text-gray-400">...</span>
            )}
            <button
              onClick={() => onPageChange(totalPages)}
              disabled={disabled}
              className="w-8 h-8 rounded-lg text-sm font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              {totalPages}
            </button>
          </>
        )}

        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages || disabled}
          className="p-1.5 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          aria-label="Página siguiente"
        >
          <FiChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}

// ----------------------------------------------------
// COMPONENTE: Estado de error
// ----------------------------------------------------
interface ErrorStateProps {
  message: string;
  onRetry?: () => void;
}

function ErrorState({ message, onRetry }: ErrorStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <FiAlertCircle className="w-12 h-12 text-red-400 mb-4" />
      <p className="text-gray-600 dark:text-gray-400 mb-4">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 rounded-lg transition-colors"
        >
          <FiRefreshCw className="w-4 h-4" />
          Reintentar
        </button>
      )}
    </div>
  );
}

// ----------------------------------------------------
// HOOK: Detectar tema
// ----------------------------------------------------
function useTheme() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const html = document.documentElement;

    const updateTheme = () => {
      setIsDark(html.classList.contains("dark"));
    };

    updateTheme();

    const observer = new MutationObserver(updateTheme);
    observer.observe(html, { attributes: true, attributeFilter: ["class"] });

    return () => observer.disconnect();
  }, []);

  return isDark;
}

// ----------------------------------------------------
// COMPONENTE PRINCIPAL
// ----------------------------------------------------
export default function Home() {
  const isDark = useTheme();

  // Estados principales
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Estados para historial de usuarios
  const [timeRange, setTimeRange] = useState<TimeRange>("1y");
  const [historyData, setHistoryData] = useState<ChartData | null>(null);
  const [historyLoading, setHistoryLoading] = useState(false);

  // Estados para comentarios
  const [comments, setComments] = useState<Comment[]>([]);
  const [commentsPagination, setCommentsPagination] = useState<CommentsPagination | null>(null);
  const [commentsPage, setCommentsPage] = useState(1);
  const [commentsLoading, setCommentsLoading] = useState(false);

  // Cargar datos iniciales del dashboard
  const fetchDashboardData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await getAllDashboardDataRequest(12, 5);
      setData(result);
      setComments(result.comments.items);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Error desconocido";
      setError(message);
    } finally {
      setLoading(false);
    }
  }, []);

  // Cargar historial de usuarios por rango
  const fetchUsersHistory = useCallback(async (months: number) => {
    try {
      setHistoryLoading(true);
      const result = await getUsersHistoryRequest(months);
      setHistoryData(result);
    } catch (err) {
      console.error("Error al cargar historial:", err);
    } finally {
      setHistoryLoading(false);
    }
  }, []);

  // Cargar comentarios paginados
  const fetchComments = useCallback(async (page: number) => {
    try {
      setCommentsLoading(true);
      const result = await getCommentsRequest(page, 5);
      setComments(result.comments);
      setCommentsPagination(result.pagination);
    } catch (err) {
      console.error("Error al cargar comentarios:", err);
    } finally {
      setCommentsLoading(false);
    }
  }, []);

  // Efecto inicial
  useEffect(() => {
    fetchDashboardData();
  }, [fetchDashboardData]);

  // Manejar cambio de rango temporal
  const handleTimeRangeChange = (range: TimeRange) => {
    setTimeRange(range);
    fetchUsersHistory(timeRangeToMonths(range));
  };

  // Manejar cambio de página de comentarios
  const handlePageChange = (page: number) => {
    setCommentsPage(page);
    fetchComments(page);
  };

  // Datos para el gráfico de historial
  const usersHistoryData = historyData || data?.usersHistory;

  // Configuración base de gráficos
  const baseChartConfig: ApexOptions = useMemo(
    () => ({
      chart: {
        background: "transparent",
        toolbar: { show: false },
        fontFamily: "Inter, system-ui, sans-serif",
      },
      theme: { mode: isDark ? "dark" : "light" },
      tooltip: { theme: isDark ? "dark" : "light" },
      legend: {
        labels: { colors: isDark ? "#D1D5DB" : "#4B5563" },
      },
      grid: {
        borderColor: isDark ? "#374151" : "#E5E7EB",
        strokeDashArray: 3,
      },
    }),
    [isDark]
  );

  // Configuración: Gráfico de pastel
  const pieConfig: ApexOptions = useMemo(
    () => ({
      ...baseChartConfig,
      labels: data?.testsDistribution.labels || ["IEPPO", "PHB", "TEPE"],
      colors: [COLORS.primary, COLORS.secondary, COLORS.accent],
      dataLabels: {
        enabled: true,
        style: {
          fontSize: "12px",
          fontWeight: 500,
          colors: ["#fff"],
        },
        dropShadow: { enabled: false },
      },
      stroke: {
        width: 2,
        colors: [isDark ? "#1F2937" : "#FFFFFF"],
      },
    }),
    [baseChartConfig, data?.testsDistribution.labels, isDark]
  );

  // Configuración: Gráfico de línea
  const lineConfig: ApexOptions = useMemo(
    () => ({
      ...baseChartConfig,
      xaxis: {
        categories: usersHistoryData?.categories || [],
        labels: {
          style: { colors: isDark ? "#9CA3AF" : "#6B7280", fontSize: "11px" },
          rotate: (usersHistoryData?.categories?.length || 0) > 12 ? -45 : 0,
          rotateAlways: (usersHistoryData?.categories?.length || 0) > 12,
          hideOverlappingLabels: true,
        },
        axisBorder: { show: false },
        axisTicks: { show: false },
        tickAmount: Math.min(12, usersHistoryData?.categories?.length || 12),
      },
      yaxis: {
        labels: {
          style: { colors: isDark ? "#9CA3AF" : "#6B7280", fontSize: "12px" },
        },
      },
      stroke: { curve: "smooth", width: 2.5 },
      colors: [COLORS.primary],
      markers: {
        size: (usersHistoryData?.categories?.length || 0) > 12 ? 0 : 4,
        strokeWidth: 0,
        hover: { size: 6 },
      },
    }),
    [baseChartConfig, usersHistoryData, isDark]
  );

  // Configuración: Gráfico de barras horizontal
  const horizontalBarConfig: ApexOptions = useMemo(
    () => ({
      ...baseChartConfig,
      plotOptions: {
        bar: {
          horizontal: true,
          borderRadius: 4,
          barHeight: "60%",
        },
      },
      xaxis: {
        categories: data?.satisfaction.categories || [],
        labels: {
          style: { colors: isDark ? "#9CA3AF" : "#6B7280", fontSize: "12px" },
        },
      },
      yaxis: {
        labels: {
          style: { colors: isDark ? "#9CA3AF" : "#6B7280", fontSize: "12px" },
        },
      },
      colors: [COLORS.primary],
      dataLabels: { enabled: false },
    }),
    [baseChartConfig, data?.satisfaction.categories, isDark]
  );

  // Configuración: Gráfico de barras vertical
  const verticalBarConfig: ApexOptions = useMemo(
    () => ({
      ...baseChartConfig,
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: "50%",
          borderRadius: 4,
        },
      },
      xaxis: {
        categories: data?.navigationDifficulty.categories || [],
        labels: {
          style: { colors: isDark ? "#9CA3AF" : "#6B7280", fontSize: "11px" },
          rotate: -15,
          rotateAlways: false,
        },
      },
      yaxis: {
        labels: {
          style: { colors: isDark ? "#9CA3AF" : "#6B7280", fontSize: "12px" },
        },
      },
      colors: [COLORS.secondary],
      dataLabels: { enabled: false },
    }),
    [baseChartConfig, data?.navigationDifficulty.categories, isDark]
  );

  // Formatear fecha
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("es-PE", {
      day: "numeric",
      month: "short",
    });
  };

  // Calcular total de páginas para comentarios
  const totalCommentPages =
    commentsPagination?.totalPages ||
    Math.ceil((data?.comments.total || 0) / 5);

  // Mostrar error general
  if (error && !data) {
    return (
      <>
        <PageMeta
          title="Dashboard | Sovio Cusco Admin"
          description="Panel de control administrativo"
        />
        <PageBreadcrumb pageTitle="Dashboard" />
        <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl p-8">
          <ErrorState message={error} onRetry={fetchDashboardData} />
        </div>
      </>
    );
  }

  return (
    <>
      <PageMeta
        title="Dashboard | Sovio Cusco Admin"
        description="Panel de control administrativo"
      />
      <PageBreadcrumb pageTitle="Dashboard" />

      {/* KPIs */}
      <section
        className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-6"
        aria-label="Indicadores principales"
      >
        <KPICard
          title="Usuarios registrados"
          value={data?.metrics.totalUsers.toLocaleString() || 0}
          icon={<FiUsers className="w-5 h-5" aria-hidden="true" />}
          subtitle="Total acumulado"
          loading={loading}
        />
        <KPICard
          title="Estudiantes evaluados"
          value={data?.metrics.totalEvaluated.toLocaleString() || 0}
          icon={<FiUserCheck className="w-5 h-5" aria-hidden="true" />}
          subtitle={
            data && data.metrics.totalUsers > 0
              ? `${Math.round((data.metrics.totalEvaluated / data.metrics.totalUsers) * 100)}% del total`
              : undefined
          }
          loading={loading}
        />
        <KPICard
          title="Pruebas completadas"
          value={data?.metrics.totalTests.toLocaleString() || 0}
          icon={<FiClipboard className="w-5 h-5" aria-hidden="true" />}
          subtitle="Todas las categorías"
          loading={loading}
        />
        <KPICard
          title="Valoración apariencia"
          value={data ? `${data.metrics.appearanceRating} / 5` : "0 / 5"}
          icon={<FiStar className="w-5 h-5" aria-hidden="true" />}
          subtitle="Promedio general"
          loading={loading}
        />
      </section>

      {/* Gráficos */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 mb-6">
        <ChartContainer
          title="Distribución de pruebas por tipo"
          loading={loading}
        >
          <Chart
            type="pie"
            series={data?.testsDistribution.series || [0, 0, 0]}
            options={pieConfig}
            height={320}
          />
        </ChartContainer>

        <ChartContainer
          title="Registro histórico de usuarios"
          controls={
            <TimeRangeSelector
              value={timeRange}
              onChange={handleTimeRangeChange}
              disabled={historyLoading}
            />
          }
          loading={loading || historyLoading}
        >
          <Chart
            type="line"
            series={[
              {
                name: "Usuarios nuevos",
                data: usersHistoryData?.series || [],
              },
            ]}
            options={lineConfig}
            height={320}
          />
        </ChartContainer>

        <ChartContainer title="Nivel de satisfacción" loading={loading}>
          <Chart
            type="bar"
            series={[
              {
                name: "Respuestas",
                data: data?.satisfaction.series || [],
              },
            ]}
            options={horizontalBarConfig}
            height={320}
          />
        </ChartContainer>

        <ChartContainer title="Dificultad de navegación" loading={loading}>
          <Chart
            type="bar"
            series={[
              {
                name: "Respuestas",
                data: data?.navigationDifficulty.series || [],
              },
            ]}
            options={verticalBarConfig}
            height={320}
          />
        </ChartContainer>
      </div>

      {/* Tabla de comentarios */}
      <section
        className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 p-5 rounded-xl"
        aria-label="Comentarios de usuarios"
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-base font-semibold text-gray-800 dark:text-gray-100">
            Comentarios recientes
          </h3>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            {commentsPagination?.totalComments || data?.comments.total || 0} comentarios
          </span>
        </div>

        {commentsLoading || loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="w-8 h-8 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : comments.length > 0 ? (
          <>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-200 dark:border-gray-700">
                    <th className="text-left py-3 px-4 font-medium text-gray-600 dark:text-gray-300">
                      Usuario
                    </th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600 dark:text-gray-300">
                      Comentario
                    </th>
                    <th className="text-right py-3 px-4 font-medium text-gray-600 dark:text-gray-300 w-24">
                      Fecha
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {comments.map((comment) => (
                    <tr
                      key={comment.id}
                      className="border-b border-gray-100 dark:border-gray-700/50 last:border-0 hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors"
                    >
                      <td className="py-3 px-4 text-gray-700 dark:text-gray-200 font-medium whitespace-nowrap">
                        {comment.name}
                      </td>
                      <td className="py-3 px-4 text-gray-600 dark:text-gray-300">
                        {comment.recommendation}
                      </td>
                      <td className="py-3 px-4 text-gray-400 dark:text-gray-500 text-right whitespace-nowrap">
                        {formatDate(comment.date)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <Pagination
              currentPage={commentsPage}
              totalPages={totalCommentPages}
              onPageChange={handlePageChange}
              disabled={commentsLoading}
            />
          </>
        ) : (
          <p className="text-center py-8 text-gray-400 dark:text-gray-500">
            No hay comentarios disponibles
          </p>
        )}
      </section>
    </>
  );
}