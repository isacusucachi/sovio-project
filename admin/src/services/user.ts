import axios from "./axios";
import { User } from "../types/Users";

interface ApiResponse {
  users: User[];
  totalPages: number;
  currentPage: number;
}

export const createAdminUserRequest = async (data: FormData) =>
  axios.post(`/admin/create-admin-user`, data);

export const getAllAdminUsersRequest = async (
  page: number,
  limit: number
): Promise<ApiResponse> => {
  try {
    const response = await axios.get<ApiResponse>(
      `/admin/get-admin-users?page=${page}&limit=${limit}`
    );
    return response.data;
  } catch (error) {
    throw new Error("Error al obtener los usuarios.");
  }
};

export const getAdminUserRequest = async (id: string): Promise<ApiResponse> => {
  try {
    const res = await axios.get<ApiResponse>(`/admin/get-admin-user/${id}`);
    return res.data;
  } catch (error) {
    throw new Error("Error al obtener usuario.");
  }
};

export const updateAdminUserRequest = async (id: string, data: FormData) =>
  axios.put(`/admin/update-admin-user/${id}`, data);

export const deleteAdminUserRequest = async (id: string) =>
  axios.delete(`/admin/delete-admin-user/${id}`);
