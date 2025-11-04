import axios from "axios";
import { API_URL } from "../config";

const instance = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

instance.interceptors.request.use((config) => {
  const loggedAdminUserJSON = window.sessionStorage.getItem("loggedUser");
  if (loggedAdminUserJSON) {
    const user = JSON.parse(loggedAdminUserJSON);
    const token = user.token;
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default instance;
