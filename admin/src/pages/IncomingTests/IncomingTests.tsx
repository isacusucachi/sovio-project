import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { getAllVocationalTestReports } from "../../services/vocationalTest";
import Pagination from "../../components/tables/Pagination";
import SearchInput from "../../components/tables/SearchInput";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import ComponentCard from "../../components/common/ComponentCard";
import PageMeta from "../../components/common/PageMeta";
import BasicTable from "../../components/tables/BasicTable";
import Loader from "../../components/common/Loader";

import { Column } from "../../components/tables/BasicTable";
import { VocationalTestReport } from "../../types/VocationalTypes";

const ITEMS_PER_PAGE = 15;

const columns: Column<VocationalTestReport>[] = [
  { key: "dni", label: "DNI" },
  { key: "fullname", label: "Nombre Completo" },
  { key: "email", label: "Email" },
  { key: "phoneNumber", label: "Teléfono" },
  { key: "educationalService", label: "Institución" },
  { key: "grade_section_cycle", label: "Grado/Sección/Ciclo" },
  {
    key: "evaluationDate",
    label: "Fecha Evaluación",
    render: (value) => new Date(value as string).toLocaleDateString(),
  },
  {
    key: "completedUserInformation",
    label: "Ficha",
    render: (value) => (value ? "Sí" : "No"),
  },
  {
    key: "completedIeppoTest",
    label: "IEEPO",
    render: (value) => (value ? "Sí" : "No"),
  },
  {
    key: "completedPhbTest",
    label: "PHB",
    render: (value) => (value ? "Sí" : "No"),
  },
  {
    key: "completedTepeTest",
    label: "TEPE",
    render: (value) => (value ? "Sí" : "No"),
  },
];

export default function IncomingTests() {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [dniQuery, setDniQuery] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [reports, setReports] = useState<VocationalTestReport[]>([]);

  const navigate = useNavigate();

  const handleViewDetails = (report: VocationalTestReport) => {
    navigate(`/report/${report._id}`);
  };

  const renderActions = (report: VocationalTestReport) =>
    report.completedIeppoTest ? (
      <button
        className="px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        onClick={() => handleViewDetails(report)}
      >
        Evaluar
      </button>
    ) : (
      <span title="Esta acción no está disponible para este registro">🚫</span>
    );

  useEffect(() => {
    const fetchReports = async () => {
      setLoading(true);
      try {
        const data = await getAllVocationalTestReports(
          currentPage,
          ITEMS_PER_PAGE,
          dniQuery
        );

        setReports(data.vocationalTestReports);
        setTotalPages(data.totalPages || 1);
      } catch (error) {
        console.error("Error al cargar los reportes.");
        setReports([]);
      } finally {
        setLoading(false);
      }
    };
    fetchReports();
  }, [currentPage, dniQuery]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    navigate(`/incoming-tests/${page}${dniQuery ? `?dni=${dniQuery}` : ""}`);
  };

  const handleDniSearch = (dni: string) => {
    setDniQuery(dni);
    setCurrentPage(1);
  };

  if (loading) return <Loader />;

  return (
    <>
      <PageMeta
        title="Pruebas Entrantes | Sovio Cusco - Admin Dashboard"
        description="Tablas de las pruebas no evaluadas de Sovio Cusco"
      />
      <PageBreadcrumb pageTitle="Pruebas Entrantes" />
      <div className="space-y-6">
        <ComponentCard title={`Tabla ${currentPage}`}>
          <div className="flex justify-end mb-4">
            <SearchInput onSearch={handleDniSearch} />
          </div>
          <div className="flex justify-end mb-4">
            
          </div>
          {reports.length === 0 ? (
            <p className="text-center text-gray-500 dark:text-gray-400">
              No se encontraron resultados.
            </p>
          ) : (
            <>
              <DataTable
                data={reports}
                columns={columns}
                actions={renderActions}
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
