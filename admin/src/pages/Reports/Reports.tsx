import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { getFinalTestReports } from "../../services/vocationalTest";
import Pagination from "../../components/tables/Pagination";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import ComponentCard from "../../components/common/ComponentCard";
import PageMeta from "../../components/common/PageMeta";
import BasicTable from "../../components/tables/BasicTable";
import Loader from "../../components/common/Loader";
import { Column } from "../../components/tables/BasicTable";
import { FinalReport } from "../../types/VocationalTypes";
import Papa from "papaparse";

const ITEMS_PER_PAGE = 20;

const columns: Column<FinalReport>[] = [
  { key: "D_DPTO", label: "DEPARTAMENTO" },
  { key: "D_PROV", label: "PROVINCIA" },
  { key: "D_DIST", label: "DISTRITO" },
  { key: "CEN_EDU", label: "CENTRO EDUCATIVO" },
  { key: "grade_section_cycle", label: "GRADO/SECCIÓN/CICLO" },
  { key: "evaluationDate", label: "F. EVALUACIÓN" },
  { key: "dni", label: "DNI" },
  { key: "fullname", label: "NOMBRES Y APELLIDOS" },
  { key: "age", label: "EDAD" },
  { key: "gender", label: "GÉNERO" },
  { key: "vocationalTypes", label: "T. VOCACIONALES" },
  { key: "careersOption", label: "CARRERAS" },
];

export default function Reports() {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [reports, setReports] = useState<FinalReport[]>([]);
  const [tempStartDate, setTempStartDate] = useState<string>("");
  const [tempEndDate, setTempEndDate] = useState<string>("");
  const [isExtracting, setIsExtracting] = useState<boolean>(false);

  useEffect(() => {
    const fetchReports = async () => {
      setLoading(true);
      try {
        const data = await getFinalTestReports(
          currentPage,
          ITEMS_PER_PAGE,
          startDate,
          endDate
        );
        setReports(data.vocationalTestReports);
        setTotalPages(data.totalPages || 1);
        if (currentPage > data.totalPages) {
          setCurrentPage(1); // Volver a la primera página si la actual no es válida
        }
      } catch (error) {
        console.error("Error al cargar los reportes.");
        setReports([]);
      } finally {
        setLoading(false);
      }
    };
    fetchReports();
  }, [currentPage, startDate, endDate]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    navigate(`/reports/${page}`);
  };

  // Función para exportar los datos a CSV
  const exportAllToCSV = async () => {
    setIsExtracting(true);
    try {
      const data = await getFinalTestReports(
        currentPage,
        "all",
        startDate,
        endDate
      );

      const csvData = data.vocationalTestReports.map((report: FinalReport) => ({
        DEPARTAMENTO: report.D_DPTO,
        PROVINCIA: report.D_PROV,
        DISTRITO: report.D_DIST,
        "CENTRO EDUCATIVO": report.CEN_EDU,
        "GRADO/SECCIÓN/CICLO": report.grade_section_cycle,
        "F. EVALUACIÓN": report.evaluationDate,
        DNI: report.dni,
        "NOMBRES Y APELLIDOS": report.fullname,
        EDAD: report.age,
        GÉNERO: report.gender,
        "T. VOCACIONALES": report.vocationalTypes,
        CARRERAS: report.careersOption,
      }));

      // Generar CSV en formato UTF-8 con BOM
      const csv = Papa.unparse(csvData);
      const bom = "\uFEFF";
      const blob = new Blob([bom + csv], { type: "text/csv;charset=utf-8;" });

      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute(
        "download",
        `REPORTE_TESTS_VOCACIONALES${startDate ? startDate + "-" : ""}${
          endDate ? endDate : ""
        }.csv`
      );
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Error al exportar:", error);
    } finally {
      setIsExtracting(false);
    }
  };

  const applyFilter = () => {
    setStartDate(tempStartDate);
    setEndDate(tempEndDate);
    setCurrentPage(1);
    navigate("/reports/1");
  };

  if (loading) return <Loader />;

  return (
    <>
      <PageMeta
        title="Reporte Final | Sovio Cusco - Admin Dashboard"
        description="Tablas de las Reporte Final de Sovio Cusco"
      />
      <PageBreadcrumb pageTitle="Reporte Final" />
      <div className="space-y-6">
        <ComponentCard title={`Tabla ${currentPage}`}>
          <div className="flex flex-col md:flex-row space-y-4 md:justify-between mb-4">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-white">
                  Fecha Inicio
                </label>
                <input
                  type="date"
                  value={tempStartDate}
                  onChange={(e) => setTempStartDate(e.target.value)}
                  className="h-11 w-full rounded-lg border px-4 py-2.5 text-sm shadow-theme-xs"
                  placeholder="Ingrese fecha de inicio"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-white">
                  Fecha Fin
                </label>
                <input
                  type="date"
                  value={tempEndDate}
                  onChange={(e) => setTempEndDate(e.target.value)}
                  className="h-11 w-full rounded-lg border px-4 py-2.5 text-sm shadow-theme-xs"
                  max={new Date().toISOString().split("T")[0]}
                />
              </div>

              <button
                onClick={applyFilter}
                className="w-full sm:w-auto bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
              >
                Aplicar Filtro
              </button>
            </div>
            <button
              onClick={exportAllToCSV}
              className={`flex w-full ${isExtracting?"px-14":""} md:w-auto bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 items-center justify-center`}
              disabled={isExtracting}
            >
              {isExtracting ? (
                <div role="status">
                  <svg
                    aria-hidden="true"
                    className="w-5 h-5 text-gray-200 animate-spin fill-blue-600"
                    viewBox="0 0 100 101"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                      fill="currentColor"
                    />
                    <path
                      d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                      fill="currentFill"
                    />
                  </svg>
                  <span className="sr-only">Loading...</span>
                </div>
              ) : (
                "Exportar CSV"
              )}
            </button>
          </div>
          {reports.length === 0 ? (
            <p className="text-center text-gray-500 dark:text-gray-400">
              No se encontraron resultados.
            </p>
          ) : (
            <>
              <BasicTable
                data={reports}
                columns={columns}
                ITEMS_PER_PAGE={ITEMS_PER_PAGE}
                currentPage={currentPage}
              />
              <Pagination
                totalPages={totalPages}
                currentPage={currentPage}
                onPageChange={handlePageChange}
              />
            </>
          )}
        </ComponentCard>
      </div>
    </>
  );
}
