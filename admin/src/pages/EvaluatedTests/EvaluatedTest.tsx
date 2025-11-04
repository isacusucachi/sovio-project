import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { getAllEvaluatedVocationalTestReports } from "../../services/vocationalTest";
import Pagination from "../../components/tables/Pagination";
import SearchInput from "../../components/tables/SearchInput";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import ComponentCard from "../../components/common/ComponentCard";
import PageMeta from "../../components/common/PageMeta";
import BasicTable from "../../components/tables/BasicTable";
import Loader from "../../components/common/Loader";
import DownloadReportButton from "../../components/vocationalTest/DownloadReportButton";

import { Column } from "../../components/tables/BasicTable";
import { VocationalTestReport } from "../../types/VocationalTypes";

const ITEMS_PER_PAGE = 20;

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

const renderActions = (report: VocationalTestReport) => (
  <DownloadReportButton reportId={report._id} />
);

export default function EvaluatedTests() {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [dniQuery, setDniQuery] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [reports, setReports] = useState<VocationalTestReport[]>([]);

  useEffect(() => {
    const fetchReports = async () => {
      setLoading(true);
      try {
        const data = await getAllEvaluatedVocationalTestReports(
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
    navigate(`/evaluated-tests/${page}${dniQuery ? `?dni=${dniQuery}` : ""}`);
  };

  const handleDniSearch = (dni: string) => {
    setDniQuery(dni);
    setCurrentPage(1);
  };

  if (loading) return <Loader />;

  return (
    <>
      <PageMeta
        title="Pruebas Evaluadas | Sovio Cusco - Admin Dashboard"
        description="Tablas de las pruebas evaluadas de Sovio Cusco"
      />
      <PageBreadcrumb pageTitle="Pruebas Evaluadas" />
      <div className="space-y-6">
        <ComponentCard title={`Tabla ${currentPage}`}>
          <div className="flex justify-end mb-4">
            <SearchInput onSearch={handleDniSearch} />
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
