import axios, { AxiosError, AxiosResponse } from "axios";
import Cookies from "js-cookie";

const token = Cookies.get("auth");
const API_URL = process.env.NEXT_PUBLIC_API_URI_BASE;
const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json; charset=utf-8",
    Accept: "*/*",
    Authorization: `Bearer ${token}`,
  },
});

api.interceptors.request.use(
  (config: any) => config,
  (error: AxiosError) => Promise.reject(error)
);
api.interceptors.response.use(
  async (response: AxiosResponse) => response,
  async (err: AxiosError) => Promise.reject(err)
);

export default api;
