import axios from "./axios";

interface LoginUser {
  username: string;
  password: string;
  recaptchaToken: string | null;
}

interface AuthResponse {
  token: string;
  id: string;
  username: string;
  fullname: string;
  role: string;
}

export const loginRequest = async (user: LoginUser) => {
  return axios.post<AuthResponse>("/admin/login", user);
};

export const verifyTokenRequest = async () => {
  return axios.get<AuthResponse | boolean>("/admin/verify");
};
