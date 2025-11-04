// DownloadReportButton.tsx
import React, { useState } from "react";
import { PDFDownloadLink } from "@react-pdf/renderer";
import FinalReportPDF from "./VocationalReportPDF";
import { getVocationalTestReportRequest } from "../../services/vocationalTest";

interface Props {
  reportId: string;
}

const DownloadReportButton: React.FC<Props> = ({ reportId }) => {
  const [reportData, setReportData] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const fetchReportData = async () => {
    setLoading(true);
    try {
      const { data } = await getVocationalTestReportRequest(reportId);
      setReportData(data);
    } catch (error) {
      console.error("Error fetching report:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {!reportData ? (
        <button
          onClick={fetchReportData}
          className="px-3 py-1 bg-green-500 text-white rounded-md hover:bg-green-600"
          disabled={loading}
        >
          {loading ? "Generando ..." : "Generar PDF"}
        </button>
      ) : (
        <PDFDownloadLink
          document={<FinalReportPDF data={reportData} />}
          fileName={`${reportData.fullname.toUpperCase()}.pdf`}
          className="flex text-center px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          {({ loading: pdfLoading }) =>
            pdfLoading ? "Preparando PDF ..." : "Descargar PDF"
          }
        </PDFDownloadLink>
      )}
    </div>
  );
};

export default DownloadReportButton;
