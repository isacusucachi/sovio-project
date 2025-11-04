import axios from "./axios"; // Asegúrate de que axios tiene la configuración correcta
import {
  VocationalTestReport,
  EvaluateVocationalTestData,
  FinalReport,
} from "../types/VocationalTypes";

interface ApiResponse {
  vocationalTestReports: VocationalTestReport[];
  totalPages: number;
  currentPage: number;
}

interface ApiFinalReportResponse {
  vocationalTestReports: FinalReport[];
  totalPages: number;
  currentPage: number;
}

export const getAllVocationalTestReports = async (
  page: number,
  limit: number,
  dni?: string
): Promise<ApiResponse> => {
  try {
    const response = await axios.get<ApiResponse>(
      `/vocational-test/reports?page=${page}&limit=${limit}${
        dni ? `&dni=${dni}` : ""
      }`
    );
    return response.data;
  } catch (error) {
    throw new Error("Error al obtener los reportes.");
  }
};

export const getAllEvaluatedVocationalTestReports = async (
  page: number,
  limit: number,
  dni?: string
): Promise<ApiResponse> => {
  try {
    const response = await axios.get<ApiResponse>(
      `/vocational-test/evaluated-reports?page=${page}&limit=${limit}${
        dni ? `&dni=${dni}` : ""
      }`
    );
    return response.data;
  } catch (error) {
    throw new Error("Error al obtener los reportes.");
  }
};

export const getFinalTestReports = async (
  page?: number,
  limit?: number | string,
  startDate?: string,
  endDate?: string
): Promise<ApiFinalReportResponse> => {
  try {
    const response = await axios.get<ApiFinalReportResponse>(
      `/vocational-test/final-report?page=${page}&limit=${limit}${
        startDate ? `&startDate=${startDate}` : ""
      }${endDate ? `&endDate=${endDate}` : ""}`
    );
    return response.data;
  } catch (error) {
    throw new Error("Error al obtener los reportes.");
  }
};

export const getVocationalTestReportRequest = async (id: string) => {
  return axios.get(`/vocational-test/reports/${id}`);
};

export const evaluateVocationalTestReportRequest = async (
  id: string,
  data: EvaluateVocationalTestData
) => {
  return axios.put(`/vocational-test/reports/${id}`, data);
};
