import axios from "axios";
import { API_URL } from "../config";

// Crear instancia de axios con configuración base
const instance = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

// Interceptor para agregar el token a cada solicitud
instance.interceptors.request.use((config) => {
  // Buscar primero en sessionStorage, luego en localStorage
  const loggedAdminUserJSON =
    sessionStorage.getItem("loggedAdminUser") || localStorage.getItem("loggedAdminUser");

  if (loggedAdminUserJSON) {
    try {
      const user = JSON.parse(loggedAdminUserJSON);
      if (user.token) {
        config.headers.Authorization = `Bearer ${user.token}`;
      }
    } catch (error) {
      console.error("Error parsing stored user:", error);
    }
  }

  return config;
});

export default instance;
