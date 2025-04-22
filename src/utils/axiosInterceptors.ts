import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true,
});

type SubscriberCallback = (accessToken: string) => void;
let subscribers: SubscriberCallback[] = [];
let isRefreshing = false;

const getUserRole = (): "freelancer" | "client" | null => {
  const storedRole = localStorage.getItem("userRole");
  if (storedRole === "freelancer" || storedRole === "client") {
    return storedRole;
  }
  return null;
};

const onRefreshed = (accessToken: string): void => {
  subscribers.forEach((callback) => callback(accessToken));
  subscribers = [];
};

apiClient.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as AxiosRequestConfig & {
      _retry?: boolean;
    };

    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise<AxiosResponse | null>((resolve) => {
          subscribers.push((accessToken) => {
            if (originalRequest.headers) {
              originalRequest.headers.Authorization = `Bearer ${accessToken}`;
            }
            resolve(apiClient(originalRequest));
          });
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const role = getUserRole();
        const endpoint =
          role === "freelancer"
            ? "/freelancer/refresh-token"
            : role === "client"
            ? "/client/refresh-token"
            : null;

        if (!endpoint) {
          throw new Error("No user role found");
        }

        const refreshResponse = await apiClient.post<{ accessToken: string }>(
          endpoint,
          {},
          { withCredentials: true }
        );

        const newAccessToken = refreshResponse.data.accessToken;
        onRefreshed(newAccessToken);
        isRefreshing = false;

        if (originalRequest.headers) {
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        }

        return apiClient(originalRequest);
      } catch (refreshError) {
        isRefreshing = false;
        window.dispatchEvent(new Event("forceLogout"));

        return Promise.resolve(null);
      }
    }

    return Promise.reject(error);
  }
);

export default apiClient;
