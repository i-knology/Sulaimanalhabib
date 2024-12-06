import axios, { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from "axios";
import Cookies from "universal-cookie";
const cookies =new Cookies();
export const BASE_URL = import.meta.env.VITE_BASE_URL;

const instance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
    DeviceId: 5000,
    Latitude: 31.964909,
    Longitude: 35.883818,
  },
});

instance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = cookies.get("token");

    // config.headers["Accept-Language"] = i18n.language;

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error: AxiosError): Promise<AxiosError> => {
    return Promise.reject(error);
  },
);

instance.interceptors.response.use(
  (response: AxiosResponse): AxiosResponse => response,
  async (error: AxiosError): Promise<AxiosError> => {
    const originalConfig = error.config;

    if (originalConfig && originalConfig.url !== "/authentication/sign-in" && error.response) {
      if (error.response.status === 401 && !(originalConfig as any)._retry) {
        (originalConfig as any)._retry = true;

        try {
          return await instance(originalConfig);
        } catch (_error) {
          return Promise.reject(_error);
        }
      }
    }

    return Promise.reject(error);
  },
);

export default instance;
