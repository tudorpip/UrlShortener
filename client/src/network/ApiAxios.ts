import axios, { AxiosError, AxiosResponse } from "axios";

const instance = axios.create({ baseURL: import.meta.env.VITE_DEPLOYED_URL });

instance.interceptors.request.use(async (config) => {
  const token = localStorage.getItem("token");
  config.headers.Authorization = token ? `Bearer ${token}` : "";
  config.headers["Content-Type"] = "application/json";
  return config;
});

instance.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      localStorage.clear();
      window.location.href = "/auth/login";
    }
    return error;
  }
);

export const getAllUrls = async () => await instance.get("/url");
export const logInUser = async (email: string, password: string) =>
  await instance.post("/user/login", { email, password });
export const createUrl = async (url: string) =>
  await instance.post("/url", { url });
export const register = async (
  username: string,
  email: string,
  password: string
) => await instance.post("/user/register", { username, email, password });
export const logout = async () => await instance.get("/user/logout");
export const validateToken = async () =>
  await instance.get("/user/validate-token");
